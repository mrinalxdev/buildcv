"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-y-hidden">
      <header className="container mx-auto px-4 py-6 border-b shadow-md rounded-xl">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-slate-900">BuildCV</span>
          </div>
          <div>
            <Link href="/about" className="px-3">
              About
            </Link>
            <Link href="/demo" className="px-3">
              Demo
            </Link>
            <Link href="/Contact" className="px-3">
              Contact
            </Link>
          </div>
          <Button className="transition-colors duration-300" variant="outline">
            Github
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
            Build Custom <br />
            <span className="">OpenCV Algorithms</span>
          </h1>
          <p className="text-lg  md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Build and export algorithms in JSON and Python Code.
          </p>
          <Link href={"/workflow"}>
            <Button>Get Started</Button>
          </Link>

          <Button variant="outline" className="ml-4 px-4 py-3">
            Documentation
          </Button>
        </div>
        <div className="relative">
          {/* Gradient shadow */}
          <div className="absolute -bottom-4 -right-4 left-4 top-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg blur-xl"></div>

          {/* Image container */}
          <div className="relative">
            <Image
              src="/hero3.png"
              width={1200}
              height={675}
              alt="Hero Image"
              className="rounded-lg shadow-lg w-full h-auto transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
