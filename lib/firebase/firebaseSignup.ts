import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import client from "../feathers/feathers-client";

function getFriendlyErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Bu email allaqachon ro'yxatdan o'tgan.";
    case "auth/invalid-email":
      return "Email manzil noto'g'ri formatda.";
    case "auth/weak-password":
      return "Parol kamida 6 ta belgidan iborat bo'lishi kerak.";
    case "auth/missing-password":
      return "Parol kiritilmadi.";
    case "auth/invalid-password":
      return "Parol juda uzun yoki yaroqsiz.";
    default:
      return "Noma'lum xatolik yuz berdi. Iltimos, qayta urinib ko'ring.";
  }
}

async function firebaseSignUp(
  email: string,
  password: string,
  fullName: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: fullName,
    });

    // 2️⃣ Firebase ID Token olish
    const idToken = await user.getIdToken(true);
    console.log(idToken);

    // 3️⃣ Feathers backend authentication
    const feathersRes = await client.authenticate({
      strategy: "firebase",
      accessToken: idToken,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const code = (error as any).code;
      alert(getFriendlyErrorMessage(code));
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export default firebaseSignUp;
