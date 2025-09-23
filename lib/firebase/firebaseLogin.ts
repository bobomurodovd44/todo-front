import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import client from "../feathers/feathers-client";

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
    // 1️⃣ Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2️⃣ Firebase ID Token olish
    const idToken = await user.getIdToken(true);
    console.log(idToken);

    // 3️⃣ Feathers backend authentication
    const feathersRes = await client.authenticate({
      strategy: "firebase",
      accessToken: idToken,
    });

    alert("User logged in: " + feathersRes.user.email);
    return feathersRes.user;
  } catch (error: any) {
    if (error?.code) {
      alert(getFriendlyErrorMessage(error.code));
    } else if (error?.message) {
      alert("Authentication error: " + error.message);
      console.error("Feathers auth error:", error);
    } else {
      alert("Noma'lum xatolik yuz berdi.");
      console.error("Unexpected error:", error);
    }
  }
}

export default firebaseLogin;
