"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMedicament } from "@/lib/appwrite";

export default function AddMedicamentPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", price: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createMedicament({
        name: form.name,
        prix: parseFloat(form.price),
      });
      alert("Médicament ajouté !");
      router.push("/dashboard");
    } catch (err) {
      alert("Erreur lors de l’ajout.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded max-w-md w-full"
      >
        <h1 className="text-xl font-bold mb-4">Ajouter un médicament</h1>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
