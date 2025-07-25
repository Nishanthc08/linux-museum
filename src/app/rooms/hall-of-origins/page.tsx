"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Book, Play, Pause, RotateCcw, ChevronRight } from "lucide-react";

const timelineEvents = [
  {
    year: "1969",
    title: "The Birth of Unix",
    description: "Ken Thompson and Dennis Ritchie create Unix at Bell Labs",
    quote: "What we wanted to preserve was not just a good environment in which to do programming, but a system around which a fellowship could form.",
    author: "Dennis Ritchie",
    significance: "The philosophical foundation of simple, modular, and powerful tools was established.",
    impact: "Created the design principles that would inspire all future Unix-like systems."
  },
  {
    year: "1983",
    title: "The GNU Project",
    description: "Richard Stallman launches the GNU Project to create a free Unix-like operating system",
    quote: "Free software is a matter of liberty, not price. To understand the concept, you should think of 'free' as in 'free speech,' not as in 'free beer.'",
    author: "Richard Stallman",
    significance: "Established the ethical framework for software freedom and user rights.",
    impact: "Created essential tools like GCC, Emacs, and the GPL license that would become Linux foundations."
  },
  {
    year: "1991",
    title: "Linux is Born",
    description: "Linus Torvalds, a 21-year-old Finnish student, announces Linux to the world",
    quote: "I'm doing a (free) operating system (just a hobby, won't be big and professional like gnu) for 386(486) AT clones.",
    author: "Linus Torvalds",
    significance: "The missing piece - a free kernel - was finally created, completing the free Unix-like system.",
    impact: "Started as a hobby project but became the foundation of the modern internet and computing."
  },
  {
    year: "1992",
    title: "Linux Meets GNU",
    description: "GNU tools are combined with the Linux kernel, creating a complete operating system",
    quote: "The combination of GNU and Linux brought about a complete free operating system.",
    author: "The Free Software Foundation",
    significance: "The marriage of GNU's tools with Linux's kernel created a powerful, free alternative to proprietary systems.",
    impact: "Enabled the rapid development of distributions and widespread adoption."
  },
  {
    year: "1993-1994",
    title: "The First Distributions",
    description: "Slackware and Debian are created, making Linux accessible to more users",
    quote: "Debian will be a distribution which is open to all developers and users to contribute their work.",
    author: "Ian Murdock",
    significance: "Transformed Linux from a kernel into complete, installable systems.",
    impact: "Established the distribution model that democratized Linux access."
  },
  {
    year: "1996",
    title: "Tux is Born",
    description: "The Linux penguin mascot, Tux, is created",
    quote: "Linus likes penguins. Linus is being silly.",
    author: "Linus Torvalds",
    significance: "Gave Linux a friendly, approachable face that contrasted with corporate software.",
    impact: "Created a unifying symbol for the global Linux community."
  },
  {
    year: "1998",
    title: "The Cathedral and the Bazaar",
    description: "Eric Raymond publishes his influential essay on open source development",
    quote: "Given enough eyeballs, all bugs are shallow.",
    author: "Eric Raymond",
    significance: "Articulated why open source development methods are superior to traditional approaches.",
    impact: "Convinced major companies to embrace open source development."
  },
  {
    year: "1999",
    title: "Corporate Adoption",
    description: "IBM announces $1 billion investment in Linux",
    quote: "IBM is betting big on Linux because we believe it represents the future of computing.",
    author: "IBM",
    significance: "Marked the beginning of enterprise acceptance of Linux.",
    impact: "Legitimized Linux in corporate environments and accelerated development."
  },
  {
    year: "2005",
    title: "Git is Created",
    description: "Linus Torvalds creates Git to manage Linux kernel development",
    quote: "I'm an egotistical bastard, and I name all my projects after myself. First 'Linux', now 'Git'.",
    author: "Linus Torvalds",
    significance: "Revolutionized software development collaboration and version control.",
    impact: "Became the foundation for modern software development and platforms like GitHub."
  },
  {
    year: "2007",
    title: "Android and Mobile",
    description: "Google releases Android, bringing Linux to mobile devices",
    quote: "Android is the first complete, open, and free mobile platform.",
    author: "Google",
    significance: "Brought Linux to the masses through smartphones and tablets.",
    impact: "Made Linux the most widely used operating system in the world."
  },
  {
    year: "2011",
    title: "Linux Everywhere",
    description: "Linux dominates servers, supercomputers, and cloud computing",
    quote: "Linux is everywhere except the desktop.",
    author: "Common observation",
    significance: "Demonstrated Linux's versatility and reliability in critical applications.",
    impact: "Powers the modern internet, cloud services, and scientific computing."
  },
  {
    year: "2024",
    title: "The Linux Museum",
    description: "A new way to learn and appreciate the Linux ecosystem",
    quote: "Teaching Linux through immersive storytelling and interactive experiences.",
    author: "Linux Museum",
    significance: "Preserves Linux culture and makes it accessible to new generations.",
    impact: "Inspires the next generation of Linux enthusiasts and developers."
  }
];

export default function HallOfOrigins() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextEvent = () => {
    setCurrentEvent((prev) => (prev + 1) % timelineEvents.length);
  };

  const prevEvent = () => {
    setCurrentEvent((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
  };

  const event = timelineEvents[currentEvent];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Museum
          </Link>
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-yellow-400">The Hall of Origins</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">The Origins of Linux</h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto">
            Journey through the pivotal moments that shaped the Linux ecosystem. From the philosophical
            foundations of Unix to the global phenomenon Linux has become today.
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-green-300">Timeline Progress</span>
            <span className="text-sm text-green-300">{currentEvent + 1} / {timelineEvents.length}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <div 
              className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentEvent + 1) / timelineEvents.length) * 100}%` }}
            />
          </div>
          
          {/* Timeline dots */}
          <div className="flex justify-between">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEvent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentEvent 
                    ? 'bg-yellow-400 scale-125' 
                    : index < currentEvent 
                      ? 'bg-green-400' 
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              key={currentEvent}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl font-bold text-yellow-400">{event.year}</div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">{event.title}</h3>
                  <p className="text-green-300">{event.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quote */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                  <blockquote className="text-lg italic text-cyan-400 mb-4">
                    "{event.quote}"
                  </blockquote>
                  <cite className="text-sm text-gray-300">— {event.author}</cite>
                </div>

                {/* Significance */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Why This Matters</h4>
                  <p className="text-green-200 leading-relaxed">{event.significance}</p>
                </div>

                {/* Impact */}
                <div>
                  <h4 className="text-lg font-semibold text-pink-400 mb-3">Long-term Impact</h4>
                  <p className="text-green-200 leading-relaxed">{event.impact}</p>
                </div>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevEvent}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
              >
                ← Previous
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentEvent(0)}
                  className="p-2 bg-gray-800 text-gray-300 rounded hover:bg-gray-700 transition-colors"
                  title="Reset to beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={nextEvent}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Right Side - Timeline Overview */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Timeline Overview</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {timelineEvents.map((timelineEvent, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEvent(index)}
                    className={`w-full text-left p-3 rounded transition-all duration-300 ${
                      index === currentEvent 
                        ? 'bg-yellow-400/20 border border-yellow-400 text-yellow-400' 
                        : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-sm">{timelineEvent.year}</div>
                        <div className="text-xs opacity-75">{timelineEvent.title}</div>
                      </div>
                      {index === currentEvent && <ChevronRight className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Philosophy Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Unix Philosophy</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Write programs that do one thing and do it well</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Write programs to work together</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Write programs to handle text streams</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300">Small is beautiful</span>
                </div>
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">The Open Source Way</h3>
              <div className="text-sm text-gray-300 space-y-2">
                <p>Linux represents more than just code—it's a philosophy of:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Collaboration over competition</li>
                  <li>Transparency over secrecy</li>
                  <li>Merit over politics</li>
                  <li>Innovation over imitation</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
