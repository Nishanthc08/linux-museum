"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Terminal, Book, Shield, Cog, FileText, Ghost, Lock, Hammer } from "lucide-react";

const museumRooms = [
  {
    id: "hall-of-origins",
    title: "The Hall of Origins",
    description: "Discover the birth of Linux and Unix philosophy",
    icon: Book,
    position: { x: 2, y: 1 },
    color: "text-yellow-400",
    available: true,
  },
  {
    id: "shell-chamber",
    title: "The Shell Chamber",
    description: "Master the art of command line interfaces",
    icon: Terminal,
    position: { x: 1, y: 2 },
    color: "text-green-400",
    available: true,
  },
  {
    id: "kernel-core",
    title: "The Kernel Core",
    description: "Journey into the heart of the operating system",
    icon: Cog,
    position: { x: 3, y: 2 },
    color: "text-cyan-400",
    available: true,
  },
  {
    id: "filesystem-gallery",
    title: "The Filesystem Gallery",
    description: "Navigate the hierarchical storage labyrinth",
    icon: FileText,
    position: { x: 1, y: 3 },
    color: "text-purple-500",
    available: true,
  },
  {
    id: "man-page-library",
    title: "The Man Page Library",
    description: "Ancient scrolls of documentation wisdom",
    icon: Book,
    position: { x: 2, y: 4 },
    color: "text-pink-500",
    available: true,
  },
  {
    id: "daemon-dungeon",
    title: "The Daemon Dungeon",
    description: "Meet the background spirits of your system",
    icon: Ghost,
    position: { x: 3, y: 3 },
    color: "text-red-400",
    available: true,
  },
  {
    id: "security-vault",
    title: "The Security Vault",
    description: "Fortify your digital fortress",
    icon: Shield,
    position: { x: 1, y: 4 },
    color: "text-orange-400",
    available: true,
  },
  {
    id: "code-forge",
    title: "The Code Forge",
    description: "Where developers craft digital artifacts",
    icon: Hammer,
    position: { x: 3, y: 4 },
    color: "text-indigo-400",
    available: true,
  },
];

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="relative overflow-hidden py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-bold mb-4 neon-text">
              LINUX MUSEUM
            </h1>
            <div className="ascii-art text-sm mb-6">
{`
    ████████╗██╗  ██╗███████╗    ██╗     ██╗███╗   ██╗██╗   ██╗██╗  ██╗
    ╚══██╔══╝██║  ██║██╔════╝    ██║     ██║████╗  ██║██║   ██║╚██╗██╔╝
       ██║   ███████║█████╗      ██║     ██║██╔██╗ ██║██║   ██║ ╚███╔╝ 
       ██║   ██╔══██║██╔══╝      ██║     ██║██║╚██╗██║██║   ██║ ██╔██╗ 
       ██║   ██║  ██║███████╗    ███████╗██║██║ ╚████║╚██████╔╝██╔╝ ██╗
       ╚═╝   ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝
`}
            </div>
            <p className="text-xl text-green-300 mb-8 max-w-2xl mx-auto">
              Welcome to the Linux Museum - An immersive journey through the philosophy,
              tools, and culture of the open source operating system that powers the digital world.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Museum Map */}
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
            Museum Floor Plan
          </h2>
          <p className="text-center text-green-300 mb-8 max-w-3xl mx-auto">
            Each room offers an interactive experience combining philosophy, hands-on learning,
            and real terminal practice. Click on any room to begin your journey.
          </p>
        </motion.div>

        {/* Interactive Museum Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {museumRooms.map((room, index) => {
            const IconComponent = room.icon;
            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.8, duration: 0.5 }}
                className={`room-entrance relative p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-green-400 transition-all duration-300 cursor-pointer group ${
                  !room.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onMouseEnter={() => setSelectedRoom(room.id)}
                onMouseLeave={() => setSelectedRoom(null)}
              >
                <Link 
                  href={room.available ? `/rooms/${room.id}` : '#'}
                  className="block h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={`mb-4 p-4 rounded-full bg-gray-800/50 group-hover:bg-gray-700/50 transition-colors`}>
                      <IconComponent className={`w-8 h-8 ${room.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    
                    <h3 className={`text-lg font-bold mb-2 ${room.color} group-hover:neon-text transition-all`}>
                      {room.title}
                    </h3>
                    
                    <p className="text-sm text-green-300 group-hover:text-green-200 transition-colors flex-1">
                      {room.description}
                    </p>
                    
                    {!room.available && (
                      <div className="mt-4 text-xs text-red-400 font-semibold">
                        Coming Soon
                      </div>
                    )}
                    
                    {room.available && (
                      <div className="mt-4 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Enter Room →
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-lg italic text-green-300 max-w-4xl mx-auto">
            "The good news is that Unix is not going anywhere. The bad news is that it's not going anywhere."
          </blockquote>
          <cite className="block mt-4 text-sm text-cyan-400">— Ken Thompson</cite>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-gray-800 text-center text-green-300">
        <p className="text-sm">
          Linux Museum © 2024 - An open source educational experience
        </p>
        <p className="text-xs mt-2 opacity-75">
          "With great power comes great responsibility" - Uncle Ben & root users
        </p>
      </footer>
    </div>
  );
}
