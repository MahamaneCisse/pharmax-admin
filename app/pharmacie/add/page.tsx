"use client";
import React from "react";
import Link from "next/link";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const AjouterPharmaciePage = () => {
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
          Ajouter votre Pharmacie
        </h1>
        <form className="space-y-5">
          {/* nom */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom de la Pharmacie
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* ville */}
          <div>
            <label
              htmlFor="ville"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Ville
            </label>
            <input
              type="text"
              id="ville"
              name="ville"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* quartier */}
          <div>
            <label
              htmlFor="quartier"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              quartier
            </label>
            <input
              type="text"
              id="quartier"
              name="quartier"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* rue */}
          <div>
            <label
              htmlFor="rue"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Rue
            </label>
            <input
              type="text"
              id="rue"
              name="rue"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* porte */}
          <div>
            <label
              htmlFor="porte"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Porte
            </label>
            <input
              type="number"
              id="porte"
              name="porte"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* contact */}
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact
            </label>
            <input
              type="number"
              id="contact"
              name="contact"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
