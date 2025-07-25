"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Terminal, ArrowLeft, Play, Check, HelpCircle } from "lucide-react";

const shellLessons = [
  {
    id: "introduction",
    title: "Welcome to the Shell",
    description: "Learn what a shell is and why it's powerful",
    commands: ["echo 'Hello, Shell!'", "whoami", "pwd"],
    explanation: "The shell is your direct interface to the operating system. It's like having a conversation with your computer.",
    philosophy: "In the beginning was the Command Line. And the Command Line was with Unix. And the Command Line was Unix."
  },
  {
    id: "navigation",
    title: "Navigation Basics",
    description: "Move around your filesystem like a digital explorer",
    commands: ["ls -la", "cd /home", "ls", "cd ~"],
    explanation: "Every file and directory has a place. The shell helps you find your way through the digital labyrinth.",
    philosophy: "To know where you are going, you must first know where you are."
  },
  {
    id: "file-operations",
    title: "File Mastery",
    description: "Create, read, and manipulate files with precision",
    commands: ["touch newfile.txt", "echo 'Linux is awesome' > newfile.txt", "cat newfile.txt", "rm newfile.txt"],
    explanation: "Files are the atoms of the digital world. The shell gives you the power to create and destroy them.",
    philosophy: "With great power comes great responsibility. Every rm command is a moment of truth."
  }
];

export default function ShellChamber() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedCommands, setCompletedCommands] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");

  const simulateCommand = (command: string) => {
    const mockOutputs: { [key: string]: string } = {
      "echo 'Hello, Shell!'": "Hello, Shell!",
      "whoami": "user",
      "pwd": "/home/user",
      "ls -la": "drwxr-xr-x 2 user user 4096 Jan 1 12:00 .\ndrwxr-xr-x 3 user user 4096 Jan 1 12:00 ..\n-rw-r--r-- 1 user user   0 Jan 1 12:00 example.txt",
      "cd /home": "",
      "ls": "user documents downloads",
      "cd ~": "",
      "touch newfile.txt": "",
      "echo 'Linux is awesome' > newfile.txt": "",
      "cat newfile.txt": "Linux is awesome",
      "rm newfile.txt": ""
    };

    const output = mockOutputs[command] || `Command '${command}' executed successfully`;
    setTerminalOutput(prev => [...prev, `$ ${command}`, output]);
    setCompletedCommands(prev => [...prev, command]);
    setCurrentCommand("");
  };

  const lesson = shellLessons[currentLesson];

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
            <Terminal className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-bold text-cyan-400">The Shell Chamber</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-green-300">Progress</span>
            <span className="text-sm text-green-300">{currentLesson + 1} / {shellLessons.length}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentLesson + 1) / shellLessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Lesson Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">{lesson.title}</h2>
              <p className="text-green-300 mb-6">{lesson.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Understanding</h3>
                <p className="text-green-200 leading-relaxed">{lesson.explanation}</p>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-400">Philosophy</span>
                </div>
                <p className="text-purple-200 italic text-sm">{lesson.philosophy}</p>
              </div>
            </motion.div>

            {/* Commands to Practice */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Commands to Practice</h3>
              <div className="space-y-3">
                {lesson.commands.map((command, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      completedCommands.includes(command) 
                        ? 'bg-green-500 text-black' 
                        : 'bg-gray-600 text-gray-400'
                    }`}>
                      {completedCommands.includes(command) ? <Check className="w-3 h-3" /> : index + 1}
                    </div>
                    <code className={`text-sm px-3 py-1 rounded ${
                      completedCommands.includes(command) 
                        ? 'bg-green-900/50 text-green-200' 
                        : 'bg-gray-800 text-gray-300'
                    }`}>
                      {command}
                    </code>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentLesson(Math.min(shellLessons.length - 1, currentLesson + 1))}
                disabled={currentLesson === shellLessons.length - 1}
                className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            </div>
          </div>

          {/* Right Side - Terminal */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden terminal-glow"
            >
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-300 ml-4">shell-chamber-terminal</span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 h-96 overflow-y-auto bg-black">
                <div className="text-green-400 font-mono text-sm">
                  <div className="mb-4">
                    <div className="text-cyan-400">Welcome to the Shell Chamber Terminal</div>
                    <div className="text-gray-400">Type the commands from the lesson to practice</div>
                    <div className="text-gray-400">Press Enter to execute</div>
                    <div className="border-t border-gray-700 my-2"></div>
                  </div>
                  
                  {/* Terminal Output */}
                  {terminalOutput.map((line, index) => (
                    <div key={index} className={line.startsWith('$') ? 'text-green-400' : 'text-gray-300'}>
                      {line}
                    </div>
                  ))}
                  
                  {/* Command Input */}
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && currentCommand.trim()) {
                          simulateCommand(currentCommand.trim());
                        }
                      }}
                      className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
                      placeholder="Enter command..."
                      autoFocus
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Command Hints */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4"
            >
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Quick Tips</h4>
              <ul className="text-xs text-gray-300 space-y-1">
                <li>• Use Tab for autocompletion</li>
                <li>• Press ↑ for command history</li>
                <li>• Ctrl+C to interrupt a command</li>
                <li>• Ctrl+L to clear the screen</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
