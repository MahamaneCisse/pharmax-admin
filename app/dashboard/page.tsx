"use client";

import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch {
        router.push("/login");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    router.push("/login");
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur le Dashboard</h1>
      {user && <p>Connecté en tant que : {user.email}</p>}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Se déconnecter
      </button>
    </main>
  );
}
