"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdNotifications } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { GoTrash } from "react-icons/go";
import Link from "next/link";
import { account, getCurrentUser } from "@/lib/appwrite";
import {
  createPharmacienIfNotExists,
  getPharmacieByPharmacien,
  getMedicamentsByPharmacie,
} from "@/lib/appwrite";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [pharmacie, setPharmacie] = useState<any>(null);
  const [medicaments, setMedicaments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      if (user) {
        await createPharmacienIfNotExists();
      }
    };

    init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser?.$id) {
        const pharmacieDoc = await getPharmacieByPharmacien(currentUser.$id);
        setPharmacie(pharmacieDoc);

        if (pharmacieDoc?.$id) {
          const meds = await getMedicamentsByPharmacie(pharmacieDoc.$id);
          setMedicaments(meds);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    // Redirect to login page after logout
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  console.log("User:", user);
  console.log("User Pharmacie:", user.pharmacie);
  const userPharmacie = pharmacie;
  if (!userPharmacie) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <p>Vous n'avez pas encore ajouté votre pharmacie.</p>
        <Link href="/pharmacie/add">
          <button className="ml-4 bg-green-600 text-white px-4 py-2 rounded">
            Ajouter votre pharmacie
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div>
      <header className="w-full  bg-green-600 flex items-center justify-between px-24">
        {/* logo Pharmax */}
        <div className="w-[200px] h-[100px] flex items-center justify-center ">
          <Image
            src={"/img/pharmax_white.png"}
            width={200}
            height={200}
            objectFit="contain"
            alt="Logo Pharmax"
          />
        </div>
        <div className="flex items-center gap-8">
          {/* notifications */}
          <div>
            <button>
              <IoMdNotifications className="text-white text-5xl" />
            </button>
          </div>
          {/* user profile */}
          <div className="text-white flex items-center gap-4">
            <div className="w-[80px] h-[80px] bg-slate-50 rounded-full">
              <Image
                src={"/img/logopharm.jpeg"}
                width={100}
                height={100}
                objectFit="cover"
                alt="User Profile"
                className="rounded-full w-full h-full"
              />
            </div>
            <p className="text-white text-2xl"> {user?.name}</p>
          </div>
        </div>
      </header>
      <main className="w-full h-screen px-24">
        <h1 className="text-2xl font-bold mt-4">Bienvenue sur le Dashboard</h1>
        <p className="text-xl"> Pharmacie {userPharmacie?.name}</p>
        {/* searchbar and add medication button */}
        <div className="flex items-center justify-around mt-8 mb-4">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            className="border border-gray-300 rounded px-4 py-2 w-1/2"
          />
          <Link href="/medicaments/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
              Ajouter un médicament <IoMdAdd />
            </button>
          </Link>
        </div>
        {/* medications table ref-price */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Nom du Médicament
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {medicaments.map((medoc, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {medoc.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {medoc.prix} Fcfa
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800 mr-4">
                      <MdEdit className="inline-block mr-1" /> Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <GoTrash className="inline-block mr-1" /> Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleLogout}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </main>
    </div>
  );
}
