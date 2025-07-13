"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/public/img/pharmax.png";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await account.createOAuth2Session(
        "google",
        `${window.location.origin}/dashboard`
      );
    } catch (err: any) {
      alert("Erreur de connexion : " + err.message);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div>
        <Image
          src={logo}
          alt="Pharmax Logo"
          width={200}
          height={200}
          className="mb-8"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-gray-900 text-white py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-gr transition-colors duration-300"
      >
        Se connecter avec Google <FcGoogle />
      </button>
      <p>Pour accéder à votre compte</p>
    </main>
  );
}
