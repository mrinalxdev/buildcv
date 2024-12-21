"use client";

import FeatureBento from "@/components/landing-page/bento";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 overflow-y-hidden">
      <header className="container mx-auto px-4 py-6 border-b rounded-xl">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-slate-900">BuildCV</span>
          </div>
          <div>
            <Link href="/about" className="px-3">
              About
            </Link>
            <Link href="https://www.youtube.com/watch?v=VOpgOSk0VtQ" className="px-3">
              Demo
            </Link>
            <Link href="https://twitter.com/Hi_Mrinal" className="px-3">
              Contact
            </Link>
          </div>
          <Link href="https://www.github.com/mrinalxdev/buildcv">
            <button
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              Star This Project
            </button>
          </Link>
        </nav>
      </header>
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

          <Link href="/documentation">
            <Button variant="outline" className="ml-5 px-8 py-8 text-md">
              Documentation
            </Button>
          </Link>
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
