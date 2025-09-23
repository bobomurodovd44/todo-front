import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function getFriendlyErrorMessage(code: string): string {
  switch (code) {
    case "auth/invalid-email":
      return "Email manzil noto'g'ri formatda.";
    case "auth/user-disabled":
      return "Bu foydalanuvchi bloklangan.";
    case "auth/user-not-found":
      return "Bunday foydalanuvchi topilmadi.";
    case "auth/wrong-password":
      return "Email yoki parol noto‘g‘ri.";
    case "auth/missing-password":
      return "Parol kiritilmadi.";
    default:
      return "Noma'lum xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
  }
}

async function firebaseLogin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as any).code;
      alert(getFriendlyErrorMessage(code));
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default firebaseLogin;
