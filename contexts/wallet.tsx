import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from '@firebase/firestore';
import { firestore } from '@/config/firebase';
import { useAuth } from './authContext';

export type WalletType = {
	id?: string;
	name: string;
	amount?: number;
	totalIncome?: number;
	totalExpenses?: number;
	image: any;
	uid?: string;
	created?: Date;
};

// Add these types
type TransactionType = 'income' | 'expense';

type TransactionData = {
	amount: number;
	type: TransactionType;
	date: Date;
	category?: string;
	note?: string;
	image?: any;
	walletId: string;
};


type WalletContextType = {
	wallet: WalletType | null;
	wallets: WalletType[];
	setWallet: (wallet: WalletType | null) => void;
	createWallet: (walletData: Partial<WalletType>) => Promise<{ success: boolean; msg?: string }>;
	updateWallet: (walletId: string, data: Partial<WalletType>) => Promise<{ success: boolean; msg?: string }>;
	fetchWallets: () => Promise<void>;
	getWalletById: (walletId: string) => Promise<WalletType | null>;
	addTransaction: (data: TransactionData) => Promise<{ success: boolean; msg?: string }>;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [wallet, setWallet] = useState<WalletType | null>(null);
	const [wallets, setWallets] = useState<WalletType[]>([]);
	const { user } = useAuth();

	useEffect(() => {
		if (user?.uid) {
			fetchWallets();
		}
	}, [user]);

	const fetchWallets = async () => {
		if (!user?.uid) return;

		try {
			const walletsRef = collection(firestore, 'wallets');
			const q = query(walletsRef, where('uid', '==', user.uid));
			const querySnapshot = await getDocs(q);

			const walletsData: WalletType[] = [];
			querySnapshot.forEach((doc) => {
				walletsData.push({ id: doc.id, ...doc.data() } as WalletType);
			});

			setWallets(walletsData);

			// Set the first wallet as active if none is selected
			if (!wallet && walletsData.length > 0) {
				setWallet(walletsData[0]);
			}
		} catch (error: any) {
			console.error("Error fetching wallets:", error);
		}
	};

	const createWallet = async (walletData: Partial<WalletType>) => {
		try {
			if (!user?.uid) throw new Error('User not authenticated');

			const newWallet: WalletType = {
				name: walletData.name || 'New Wallet',
				amount: walletData.amount || 0,
				totalIncome: walletData.totalIncome || 0,
				totalExpenses: walletData.totalExpenses || 0,
				image: walletData.image || null,
				uid: user.uid,
				created: new Date(),
			};

			const walletRef = doc(collection(firestore, 'wallets'));
			await setDoc(walletRef, newWallet);

			const createdWallet = { ...newWallet, id: walletRef.id };
			setWallets([...wallets, createdWallet]);
			setWallet(createdWallet);

			return { success: true };
		} catch (error: any) {
			console.error("Error creating wallet:", error);
			return { success: false, msg: error.message };
		}
	};

	const updateWallet = async (walletId: string, data: Partial<WalletType>) => {
		try {
			const walletRef = doc(firestore, 'wallets', walletId);
			await updateDoc(walletRef, data);

			// Update local state
			const updatedWallets = wallets.map(w =>
				w.id === walletId ? { ...w, ...data } : w
			);
			setWallets(updatedWallets);

			if (wallet?.id === walletId) {
				setWallet({ ...wallet, ...data });
			}

			return { success: true };
		} catch (error: any) {
			console.error("Error updating wallet:", error);
			return { success: false, msg: error.message };
		}
	};

	const getWalletById = async (walletId: string): Promise<WalletType | null> => {
		try {
			const walletRef = doc(firestore, 'wallets', walletId);
			const walletSnap = await getDoc(walletRef);

			if (walletSnap.exists()) {
				return { id: walletSnap.id, ...walletSnap.data() } as WalletType;
			}
			return null;
		} catch (error) {
			console.error("Error fetching wallet:", error);
			return null;
		}
	};

	const addTransaction = async (data: TransactionData) => {
		try {
			if (!user?.uid) throw new Error('User not authenticated');

			const walletRef = doc(firestore, 'wallets', data.walletId);
			const walletDoc = await getDoc(walletRef);

			if (!walletDoc.exists()) {
				throw new Error('Wallet not found');
			}

			const currentWallet = walletDoc.data() as WalletType;
			const updatedWallet: Partial<WalletType> = {
				amount: currentWallet.amount || 0,
				totalIncome: currentWallet.totalIncome || 0,
				totalExpenses: currentWallet.totalExpenses || 0,
			};

			if (data.type === 'income') {
				updatedWallet.amount = (currentWallet.amount || 0) + data.amount;
				updatedWallet.totalIncome = (currentWallet.totalIncome || 0) + data.amount;
			} else {
				updatedWallet.amount = (currentWallet.amount || 0) - data.amount;
				updatedWallet.totalExpenses = (currentWallet.totalExpenses || 0) + data.amount;
			}

			// Update the wallet
			await updateWallet(data.walletId, updatedWallet);

			// Store the transaction in a separate collection
			const transactionRef = doc(collection(firestore, 'transactions'));
			await setDoc(transactionRef, {
				...data,
				uid: user.uid,
				created: new Date(),
			});

			return { success: true };
		} catch (error: any) {
			console.error("Error adding transaction:", error);
			return { success: false, msg: error.message };
		}
	};

	const contextValue: WalletContextType = {
		wallet,
		wallets,
		setWallet,
		createWallet,
		updateWallet,
		fetchWallets,
		getWalletById,
		addTransaction
	};

	return (
		<WalletContext.Provider value={contextValue}>
			{children}
		</WalletContext.Provider>
	);
};

export const useWallet = (): WalletContextType => {
	const context = useContext(WalletContext);
	if (!context) {
		throw new Error('useWallet must be used within a WalletProvider');
	}
	return context;
};