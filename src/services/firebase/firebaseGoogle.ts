import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import client from "../feathers/feathers-client";
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // Google accountdan user ma’lumotlari
    const user = result.user;

    const idToken = await user.getIdToken(true);

    const feathersRes = await client.authenticate({
      strategy: "firebase",
      accessToken: idToken,
    });
  } catch (error) {
    console.error("Google login xatosi:", error);
  }
};
