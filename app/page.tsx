import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="w-screen max-w-7xl h-screen flex items-center justify-center mx-auto flex-col gap-4 ">
      <div>
        <Image
          src="/img/pharmax.png"
          alt="Pharmax Logo"
          width={200}
          height={200}
          className="mb-8"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center p-8 bg-white shadow-lg rounded-lg gap-4">
        <h1 className="text-5xl font-bold mb-4">Bienvenue sur Pharmax</h1>
        <p className="text-lg text-gray-600">
          Augmentez votre presence en ligne et facilitez la gestion de votre
          pharmacie avec notre application mobile.
        </p>
      </div>
      <Link href={"./login"} className="cursor-pointer">
        <button className="bg-green-700 py-2 px-4 flex items-center justify-center gap-1 text-white rounded-lg hover:bg-green-800 transition-colors duration-300">
          Commencer <FaArrowRight />
        </button>
      </Link>
    </div>
  );
}
