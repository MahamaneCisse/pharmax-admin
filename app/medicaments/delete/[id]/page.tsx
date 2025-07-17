"use client";
import { useRouter } from "next/navigation";
import { deleteMedicament } from "@/lib/appwrite";

export default function DeleteMedicamentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteMedicament(params.id);
      alert("Médicament supprimé avec succès !");
      router.push("/dashboard");
    } catch (err: any) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow rounded max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Supprimer le médicament</h1>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer ce médicament ?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Annuler
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
