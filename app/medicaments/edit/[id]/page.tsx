"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateMedicament } from "@/lib/appwrite";
import { getMedicamentById } from "@/lib/appwrite";

export default function EditMedicamentPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "" });

  useEffect(() => {
    const getMedicament = async () => {
      const medicament = await getMedicamentById(params.id);
      if (medicament) {
        setForm({
          name: medicament.name,
          price: medicament.prix.toString(),
        });
      }
    };
    getMedicament();
  }, [params.id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateMedicament({
        id: params.id,
        name: form.name,
        prix: parseFloat(form.price),
      });
      alert("Médicament modifié avec succès !");
      router.push("/dashboard");
    } catch (err) {
      alert("Erreur lors de la modification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded max-w-md w-full"
      >
        <h1 className="text-xl font-bold mb-4">Modifier un médicament</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Prix</label>
          <input
            name="price"
            type="number"
            required
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}
