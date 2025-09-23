"use client";
import firebaseLogin from "@/lib/firebase/firebaseLogin";
import React from "react";

const page = () => {
  return (
    <button
      onClick={() =>
        firebaseLogin("bobomurodovdilshod@gmail.com", "dilshod2006")
      }
    >
      Login
    </button>
  );
};

export default page;
