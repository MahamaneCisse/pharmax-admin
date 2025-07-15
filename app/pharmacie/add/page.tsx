"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { createPharmacie } from "@/lib/appwrite";

const AjouterPharmaciePage = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    ville: "",
    commune: "",
    quartier: "",
    contact: "",
    apropos: "",
    horaire: "",
    notation: 0,
    longitude: "",
    latitude: "",
    rue: "",
    porte: 0,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        ...form,
        notation: parseInt(form.notation.toString(), 10),

        longitude: parseFloat(form.longitude.toString()),
        latitude: parseFloat(form.latitude.toString()),
      };

      await createPharmacie(data);
      alert("Pharmacie ajoutée avec succès !");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout de la pharmacie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white hover:underline bg-green-700 text-3xl p-3 rounded"
        >
          <IoArrowBack className="mr-1" />
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Ajouter votre Pharmacie
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {[
            "name",
            "ville",
            "commune",
            "quartier",
            "contact",
            "apropos",
            "horaire",
            "notation",
            "longitude",
            "latitude",
            "rue",
            "porte",
          ].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-1 capitalize"
              >
                {field}
              </label>
              <input
                type={
                  field === "notation" || field === "porte" ? "number" : "text"
                }
                id={field}
                name={field}
                required
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition"
          >
            Ajouter la pharmacie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjouterPharmaciePage;
