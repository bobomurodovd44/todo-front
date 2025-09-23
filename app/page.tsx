"use client";
import client from "@/lib/feathers/feathers-client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [fullName, setFullName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await client.reAuthenticate();
        const user = res.user;
        setFullName(user.fullName);
      } catch (err) {
        router.push("/login");
      }
    };
    checkUser();
  }, []);
  return <div>{fullName}</div>;
};

export default HomePage;
