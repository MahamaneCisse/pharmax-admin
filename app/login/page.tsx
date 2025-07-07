"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

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
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Se connecter avec google
      </button>
    </main>
  );
}
