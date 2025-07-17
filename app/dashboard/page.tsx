"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdNotifications, IoMdAdd, IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { account, getCurrentUser } from "@/lib/appwrite";
import {
  createPharmacienIfNotExists,
  getPharmacieByPharmacien,
  getMedicamentsByPharmacie,
} from "@/lib/appwrite";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [pharmacie, setPharmacie] = useState<any>(null);
  const [medicaments, setMedicaments] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      if (currentUser) {
        await createPharmacienIfNotExists();
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
    router.push("/login");
  };

  const filteredMedicaments = medicaments.filter((med) =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
          <div className="h-4 w-48 bg-gray-300 rounded animate-pulse mx-auto"></div>
          <p className="text-gray-500">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (!pharmacie) {
    return (
      <div className="flex items-center justify-center h-screen flex-col space-y-4 text-center">
        <p className="text-lg">
          Vous n'avez pas encore ajouté votre pharmacie.
        </p>
        <Link href="/pharmacie/add">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Ajouter votre pharmacie
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return (
    <div>
      <header className="w-full bg-green-600 flex items-center justify-between px-24 py-4">
        <div className="w-[200px] h-[100px] flex items-center justify-center">
          <Image
            src="/img/pharmax_white.png"
            width={200}
            height={200}
            objectFit="contain"
            alt="Logo Pharmax"
          />
        </div>
        <div className="flex items-center gap-8">
          <button>
            <IoMdNotifications className="text-white text-4xl" />
          </button>
          <div className="text-white flex items-center gap-4">
            <div className="w-[60px] h-[60px] bg-slate-50 rounded-full overflow-hidden">
              <Image
                src="/img/logopharm.jpeg"
                width={100}
                height={100}
                objectFit="cover"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-xl">{user?.name}</p>
          </div>
        </div>
      </header>

      <main className="w-full h-screen px-24">
        <div className="flex items-center justify-between mt-8 mb-4">
          <h1 className="text-2xl font-bold mt-4">
            Bienvenue sur le Dashboard
          </h1>
          <p className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
            Pharmacie : {pharmacie?.name}
          </p>
        </div>

        {/* Search & Add */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            className="border border-gray-300 rounded px-4 py-2 w-1/2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href="/medicaments/add">
            <button className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2">
              Ajouter un médicament <IoMdAdd />
            </button>
          </Link>
        </div>

        {/* Table des médicaments */}
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
            <tbody className="divide-y divide-gray-200">
              {filteredMedicaments.map((medicament) => (
                <tr key={medicament.$id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {medicament.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {medicament.prix} Fcfa
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link href={`/medicaments/edit/${medicament.$id}`}>
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          title="Modifier"
                        >
                          <MdEdit className="w-6 h-6" />
                        </button>
                      </Link>
                      <Link href={`/medicaments/delete/${medicament.$id}`}>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer"
                        >
                          <IoMdTrash className="w-6 h-6" />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMedicaments.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center text-gray-500 py-4 text-sm"
                  >
                    Aucun médicament trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
        >
          Se déconnecter
        </button>
      </main>
    </div>
  );
}
