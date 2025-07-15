"use client";

import Image from "next/image";
import logo from "@/public/img/pharmax.png";
import { FcGoogle } from "react-icons/fc";
import { login } from "@/lib/appwrite";

export default function LoginPage() {
  const handleLogin = async () => {
    console.log("Tentative de connexion...");
    await login();
    console.log("Connexion réussie, redirection vers le tableau de bord...");
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
