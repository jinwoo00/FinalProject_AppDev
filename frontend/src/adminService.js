import { db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

// Function to set a user's role
export async function setUserRole(userId, role) {
  try {
    const userRef = doc(db, 'users', userId);
    
    // Update the role field to the specified role
    await updateDoc(userRef, {
      role: role // Set the role to whatever is passed in
    });

    console.log(`User role updated to ${role} successfully!`);
  } catch (error) {
    console.error('Error updating user role:', error);
  }
}
