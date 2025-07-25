"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TerminalProps {
  title?: string;
  initialCommands?: string[];
  onCommand?: (command: string) => string;
  className?: string;
  height?: string;
}

export default function Terminal({ 
  title = "terminal", 
  initialCommands = [],
  onCommand,
  className = "",
  height = "h-96"
}: TerminalProps) {
  const [history, setHistory] = useState<Array<{ type: 'command' | 'output', text: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Execute initial commands
    if (initialCommands.length > 0) {
      initialCommands.forEach((cmd, index) => {
        setTimeout(() => {
          executeCommand(cmd);
        }, index * 1000);
      });
    }
  }, [initialCommands]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command: string) => {
    const newHistory = [...history, { type: 'command' as const, text: command }];
    
    // Get command output
    let output = "";
    if (onCommand) {
      output = onCommand(command);
    } else {
      output = getDefaultOutput(command);
    }

    if (output) {
      newHistory.push({ type: 'output' as const, text: output });
    }

    setHistory(newHistory);
    setCurrentCommand("");
  };

  const getDefaultOutput = (command: string): string => {
    const mockOutputs: { [key: string]: string } = {
      "ls": "Documents  Downloads  Pictures  Music  Videos",
      "pwd": "/home/user",
      "whoami": "user",
      "date": new Date().toLocaleString(),
      "uname": "Linux",
      "echo hello": "hello",
      "clear": "",
      "help": "Available commands: ls, pwd, whoami, date, uname, echo, clear, help"
    };

    if (command === "clear") {
      setHistory([]);
      return "";
    }

    return mockOutputs[command] || `bash: ${command}: command not found`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      executeCommand(currentCommand.trim());
    }
  };

  return (
    <motion.div 
      className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden terminal-glow ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-300 ml-4">{title}</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={terminalRef}
        className={`p-4 ${height} overflow-y-auto bg-black font-mono text-sm`}
      >
        <div className="text-green-400">
          {/* Welcome message */}
          <div className="mb-4">
            <div className="text-cyan-400">Welcome to the Linux Museum Terminal</div>
            <div className="text-gray-400">Type 'help' for available commands</div>
            <div className="border-t border-gray-700 my-2"></div>
          </div>
          
          {/* Command history */}
          {history.map((entry, index) => (
            <div key={index} className={entry.type === 'command' ? 'text-green-400' : 'text-gray-300'}>
              {entry.type === 'command' ? '$ ' : ''}{entry.text}
            </div>
          ))}
          
          {/* Current command input */}
          <div className="flex items-center">
            <span className="text-green-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
              placeholder="Enter command..."
              autoFocus
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
