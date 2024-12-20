"use client";

import FeatureBento from "@/components/landing-page/bento";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-y-hidden">
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6">
            Build Custom <br />
            <span className="font-title font-semibold text-purple-500 underline underline-offset-4">
              OpenCV
            </span>{" "}
            Algorithms
          </h1>
          <p className="text-lg  md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Build and export algorithms in JSON and Python Code.
          </p>
          <Link href={"/workflow"}>
            <Button className="px-10 py-8 text-md">Get Started</Button>
          </Link>

          <Button variant="outline" className="ml-5 px-8 py-8 text-md">
            Documentation
          </Button>
        </div>
        <div className="relative">
          <div className="absolute -bottom-4 -right-4 left-4 top-4 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg blur-xl"></div>

          <div className="relative">
            <Image
              src="/hero3.png"
              width={1200}
              height={675}
              alt="Hero Image"
              className="rounded-lg shadow-xl w-full h-auto transition-transform duration-300 hover:scale-[1.02] bg-white p-3"
            />
          </div>
        </div>
      </main>

      <section className="my-[120px] w-full lg:max-w-[70%] mx-auto">
        <div className="text-4xl lg:text-6xl font-bold text-center">
          Features that help you{" "}
          <span className="font-title text-purple-500">Build</span>
        </div>

        <FeatureBento />
      </section>

      <section className="py-5 text-center">
        Made with 💟 by{" "}
        <Link href="https://www.twitter.com/Hi_Mrinal">Mrinal Pramanick</Link>
      </section>
    </div>
  );
}
