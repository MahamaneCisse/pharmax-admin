"use client";

import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      router.replace("/login"); // plus propre que push pour éviter le retour arrière
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
    >
      Se déconnecter
    </button>
  );
}
