"use client";
import client from "@/lib/feathers/feathers-client";
import { checkUser } from "@/lib/functions/checkUser";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [fullName, setFullName] = useState("");
  const { user } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    const authenticate = async () => {
      const user = await checkUser();
      if (!user) {
        router.push("/login");
      }
    };
    authenticate();
  }, []);

  return (
    <div>
      {user?.fullName} | {user?.email}
    </div>
  );
};

export default HomePage;
