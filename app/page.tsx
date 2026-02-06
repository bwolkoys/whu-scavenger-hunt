import Image from "next/image";
import image1 from "../public/HomePage/WHUF_Stacked_Digital.png";
import image2 from "../public/HomePage/WFR Round Logo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1BB1E7] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#7A263A] mb-8">
          SCAVENGER HUNT
        </h1>

        {/* Two Images Side by Side */}
        <div className="grid grid-cols-2 pb-10">
          <div className="relative h-30 md:h-60 rounded-lg">
            <Image
              src={image1}
              alt="WHU Foundation Logo"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative h-30 md:h-60 rounded-lg">
            <Image
              src={image2}
              alt="WHU Foundation Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Rules Section */}
        <div className="bg-[#7A263A] rounded-lg shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            How It Works
          </h2>
          <ul className="space-y-3 text-lg text-white">
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>Break into groups of 5-10 people</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>Designate a team photographer</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>Add Team Name. Snap a photo, check it off, move on.</span>
            </li>
          </ul>
        </div>

        {/* Pro Tips Section */}
        <div className="bg-[#7A263A] rounded-lg shadow-md p-6 md:p-8 mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Pro Tips
          </h2>
          <ul className="space-y-3 text-lg text-white">
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>One person per team uploads the photos at the end</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>
                Keep it moving - this should feel like wandering, not a race
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-2">•</span>
              <span>If it's funny, it counts!</span>
            </li>
          </ul>
        </div>

        {/* Optional Scoring Section */}
        <div className="bg-[#7A263A] rounded-lg shadow-md p-6 md:p-8 mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Scoring
          </h2>
          <ul className="space-y-3 text-lg text-white">
            <li className="flex items-start">
              <span>1 point per photo</span>
            </li>
            <li className="flex items-start">
              <span>+2 bonus for creativity</span>
            </li>
            <li className="flex items-start">
              <span>
                +5 for photo in front of all 4 Canyons lifts (non-skiers)
              </span>
            </li>
            <li className="flex items-start">
              <span>
                +10 for photo infront of all 5 Mountain Lodges
                (skiers/snowboarders)
              </span>
            </li>
            <li className="font-bold pt-6">
              <span>
                Judges Choice Awards:
              </span>
            </li>
              <span className="font-medium">
                Most Epic, Funniest, Best Wipeout
              </span>
          </ul>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
          <Link href="/scavenger/skier">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105">
              Scavenger Hunt – Skiers
            </button>
          </Link>

          <Link href="/scavenger/walker">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg py-4 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105">
              Scavenger Hunt – Village
            </button>
          </Link>

          <Link href="https://cvma.com/gondola-art-stroll/">
            <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold text-lg py-4 px-12 rounded-lg shadow-lg transition duration-200 transform hover:scale-105">
              Alternative: Art Stroll
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
