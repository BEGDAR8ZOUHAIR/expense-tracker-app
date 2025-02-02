import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, UserType } from '@/types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/config/firebase';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useRouter } from 'expo-router';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const [user, setUser] = useState<UserType>(null)
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				setUser({
					uid: firebaseUser.uid,
					email: firebaseUser.email,
					name: firebaseUser.displayName,
				})
				updateUserData(firebaseUser.uid);
				router.replace('/(tabs)');
			} else {
				// user is signed out
				setUser(null);
				router.replace('/auth/welcome');
			}
		});
		return () => unsubscribe();
	}, []);
	// functions for auth
	// login
	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			return { success: true }
		} catch (error: any) {
			let msg = error.message;
			console.log(msg);
			if (msg === 'Firebase: Error (auth/invalid-credential).') {
				msg = 'Wrong credentials'
			}
			if (msg === 'Firebase: Error (auth/user-not-found).') {
				msg = 'User not found'
			}
			if (msg === 'Firebase: Error (auth/wrong-password).') {
				msg = 'Wrong password'
			}
			if (msg === 'Firebase: Error (auth/too-many-requests).') {
				msg = 'Too many requests'
			}
			if (msg === 'Firebase: Error (auth/invalid-email).') {
				msg = 'Invalid email'
			}
			return { success: false, msg }
		}
	}

	//  register
	const register = async (email: string, password: string, name: string) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
			await setDoc(doc(firestore, 'users', response?.user?.uid),
				{
					name,
					email,
					uid: response?.user?.uid
				}
			);
			return { success: true }

		} catch (error: any) {
			let msg = error.message;
			if (msg === 'Firebase: Error (auth/email-already-in-use).') {
				msg = 'Email already in use'
			}
			if (msg === 'Firebase: Error (auth/invalid-email).') {
				msg = 'Invalid email'
			}
			return { success: false, msg }
		}
	}

	// update user data
	const updateUserData = async (uid: string) => {
		try {
			const docRef = doc(firestore, 'users', uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				const userData: UserType = {
					uid: data?.uid,
					email: data?.email || null,
					name: data?.name || null,
					image: data?.image || null

				}
				setUser(userData);
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}

	const contextValue: AuthContextType = {
		user,
		setUser,
		login,
		register,
		updateUserData
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	)

}


export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within a AuthProvider');
	}
	return context;
};