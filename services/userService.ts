import { doc, updateDoc } from '@firebase/firestore';
import { UserDataType, ResponseType } from './../types';
import { firestore } from '@/config/firebase';
export const updateUser = async (
	uid: string,
	updateUserData: UserDataType
): Promise<ResponseType> => {
	try {
		const docRef = doc(firestore, 'users', uid);
		await updateDoc(docRef, updateUserData);
		return { success: true };
	} catch (error: any) {
		return { success: false, msg: error.message };
	}

}
