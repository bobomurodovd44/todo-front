import client from "@/src/services/feathers/feathers-client";
import useUserStore from "@/src/store/userStore";

export const checkUser = async () => {
  try {
    const res = await client.reAuthenticate();
    const user = res.user;
    useUserStore.getState().setUser(user); // Zustand store-ni yangilash
    return user;
  } catch (err) {
    return null;
  }
};
