"use client";
import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const AjouterMedicamentPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      {/* back link */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-white hover:underline bg-green-700 text-3xl p-3 rounded "
        >
          <IoArrowBack className="mr-1" />
        </button>
      </div>
      <div className="absolute top-4 left-4">
        <Link href="/medicaments"></Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Ajouter un Médicament
        </h1>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom du Médicament
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prix (Fcfa)
            </label>
            <input
              type="text"
              id="price"
              name="price"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg font-medium hover:bg-green-800 transition"
          >
            Ajouter le Médicament
          </button>
        </form>
      </div>
    </div>
  );
};

export default AjouterMedicamentPage;
