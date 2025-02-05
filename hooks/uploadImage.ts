import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, firestore } from '@/config/firebase';

// Types
interface ImageUploadResult {
	success: boolean;
	url?: string;
	msg?: string;
}

export const pickImage = async (): Promise<string | null> => {
	try {
		// Request permissions
		const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			throw new Error('Permission to access camera roll is required!');
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});

		if (!result.canceled) {
			return result.assets[0].uri;
		}
		return null;
	} catch (error) {
		console.error('Error picking image:', error);
		return null;
	}
};

export const uploadImageToFirebase = async (
	uri: string,
	uid: string
): Promise<ImageUploadResult> => {
	try {
		// Convert URI to blob
		const response = await fetch(uri);
		const blob = await response.blob();

		// Create file reference
		const filename = `profile_${uid}_${Date.now()}.jpg`;
		const storageRef = ref(storage, `profile_images/${filename}`);

		// Upload image
		await uploadBytes(storageRef, blob);

		// Get download URL
		const downloadURL = await getDownloadURL(storageRef);

		// Update user document with new image URL
		const userRef = doc(firestore, 'users', uid);
		await updateDoc(userRef, {
			image: downloadURL
		});

		return {
			success: true,
			url: downloadURL
		};
	} catch (error: any) {
		console.error('Error uploading image:', error);
		return {
			success: false,
			msg: error.message
		};
	}
};