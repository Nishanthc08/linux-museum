"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, FileText, Folder, FolderOpen, Eye, Terminal, Info } from "lucide-react";

const fileSystemStructure = {
  "/": {
    name: "root",
    type: "directory",
    description: "The root directory - where everything begins",
    philosophy: "All paths lead from here. In Unix, everything is a file, and every file has a place.",
    children: {
      "bin": {
        name: "bin",
        type: "directory", 
        description: "Essential user binaries (programs)",
        philosophy: "The tools you need to build everything else",
        children: {
          "bash": { name: "bash", type: "file", description: "The Bash shell", philosophy: "Your faithful companion in the command line" },
          "ls": { name: "ls", type: "file", description: "List directory contents", philosophy: "The eyes of the command line" },
          "cat": { name: "cat", type: "file", description: "Display file contents", philosophy: "Sometimes you just need to see what's inside" },
          "grep": { name: "grep", type: "file", description: "Search text patterns", philosophy: "Finding needles in haystacks since 1973" }
        }
      },
      "etc": {
        name: "etc",
        type: "directory",
        description: "System configuration files",
        philosophy: "The DNA of your system - handle with care",
        children: {
          "passwd": { name: "passwd", type: "file", description: "User account information", philosophy: "Who you are in the eyes of the system" },
          "hosts": { name: "hosts", type: "file", description: "Hostname to IP address mappings", philosophy: "Your system's address book" },
          "fstab": { name: "fstab", type: "file", description: "File system table", philosophy: "The map of all storage territories" }
        }
      },
      "home": {
        name: "home",
        type: "directory",
        description: "User home directories",
        philosophy: "Every user deserves a place to call their own",
        children: {
          "user": {
            name: "user",
            type: "directory",
            description: "A user's personal space",
            philosophy: "Home is where the heart is",
            children: {
              ".bashrc": { name: ".bashrc", type: "file", description: "Bash configuration", philosophy: "Your personal shell preferences" },
              "Documents": { name: "Documents", type: "directory", description: "User documents", philosophy: "Where knowledge is stored" },
              "Downloads": { name: "Downloads", type: "directory", description: "Downloaded files", philosophy: "The digital mailbox" }
            }
          }
        }
      },
      "usr": {
        name: "usr",
        type: "directory",
        description: "User programs and data",
        philosophy: "The city where applications live and work",
        children: {
          "bin": { name: "bin", type: "directory", description: "Non-essential user binaries", philosophy: "The extended toolkit" },
          "lib": { name: "lib", type: "directory", description: "Shared libraries", philosophy: "The common knowledge shared by all" },
          "share": { name: "share", type: "directory", description: "Shared data", philosophy: "Resources for the common good" }
        }
      },
      "var": {
        name: "var",
        type: "directory",
        description: "Variable data files",
        philosophy: "The living, breathing part of your system",
        children: {
          "log": { name: "log", type: "directory", description: "System log files", philosophy: "The memory of your system" },
          "tmp": { name: "tmp", type: "directory", description: "Temporary files", philosophy: "The workspace of the digital world" }
        }
      }
    }
  }
};

type FileSystemNode = {
  name: string;
  type: "file" | "directory";
  description: string;
  philosophy: string;
  children?: { [key: string]: FileSystemNode };
};

export default function FilesystemGallery() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedNode, setSelectedNode] = useState<FileSystemNode | null>(null);
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set(["/"]));

  const getCurrentNode = (): FileSystemNode => {
    let node = fileSystemStructure["/"];
    for (const pathPart of currentPath) {
      if (node.children && node.children[pathPart]) {
        node = node.children[pathPart];
      }
    }
    return node;
  };

  const navigateToPath = (path: string[]) => {
    setCurrentPath(path);
    setSelectedNode(getCurrentNode());
  };

  const getPathString = () => {
    if (currentPath.length === 0) return "/";
    return "/" + currentPath.join("/");
  };

  const toggleDirectory = (name: string) => {
    const fullPath = currentPath.length === 0 ? name : currentPath.join("/") + "/" + name;
    setExpandedDirs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fullPath)) {
        newSet.delete(fullPath);
      } else {
        newSet.add(fullPath);
      }
      return newSet;
    });
  };

  const renderFileSystemTree = (node: FileSystemNode, path: string[] = [], depth = 0) => {
    const fullPath = path.join("/");
    const isExpanded = expandedDirs.has(fullPath === "" ? "/" : fullPath);
    
    return (
      <div key={fullPath} className={`ml-${depth * 4}`}>
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
            selectedNode === node ? 'bg-purple-500/20 border border-purple-500' : 'hover:bg-gray-800/50'
          }`}
          onClick={() => {
            if (node.type === "directory") {
              toggleDirectory(node.name);
            }
            setSelectedNode(node);
            setCurrentPath(path);
          }}
        >
          {node.type === "directory" ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-yellow-400" />
            ) : (
              <Folder className="w-4 h-4 text-yellow-400" />
            )
          ) : (
            <FileText className="w-4 h-4 text-green-400" />
          )}
          <span className={`text-sm ${node.type === "directory" ? "text-yellow-400" : "text-green-400"}`}>
            {node.name}
          </span>
        </div>
        
        {node.type === "directory" && node.children && isExpanded && (
          <div className="ml-4 border-l border-gray-700">
            {Object.entries(node.children).map(([childName, childNode]) =>
              renderFileSystemTree(childNode, [...path, childName], depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const currentNode = getCurrentNode();

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
            <FileText className="w-6 h-6 text-purple-500" />
            <h1 className="text-2xl font-bold text-purple-500">The Filesystem Gallery</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-4">Navigate the Linux Filesystem</h2>
          <p className="text-lg text-green-300 max-w-3xl mx-auto">
            Explore the hierarchical structure that organizes all files and directories in Linux.
            Each location has a purpose, a philosophy, and a story to tell.
          </p>
        </motion.div>

        {/* Current Path */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400">Current Path:</span>
          </div>
          <div className="bg-gray-900 border border-gray-700 rounded px-4 py-2 font-mono text-green-400">
            {getPathString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - File System Tree */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5" />
                File System Tree
              </h3>
              <div className="max-h-96 overflow-y-auto">
                {renderFileSystemTree(fileSystemStructure["/"], [])}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Selected Node Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {selectedNode ? (
              <>
                <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {selectedNode.type === "directory" ? (
                      <Folder className="w-8 h-8 text-yellow-400" />
                    ) : (
                      <FileText className="w-8 h-8 text-green-400" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedNode.name}</h3>
                      <p className="text-sm text-gray-400 capitalize">{selectedNode.type}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-2">Description</h4>
                      <p className="text-green-200">{selectedNode.description}</p>
                    </div>
                    
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-purple-400 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Philosophy
                      </h4>
                      <p className="text-purple-200 italic">{selectedNode.philosophy}</p>
                    </div>
                  </div>
                </div>

                {/* Children Display */}
                {selectedNode.type === "directory" && selectedNode.children && (
                  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">Contents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(selectedNode.children).map(([childName, childNode]) => (
                        <div
                          key={childName}
                          className="flex items-center gap-3 p-3 bg-gray-800/50 rounded cursor-pointer hover:bg-gray-700/50 transition-colors"
                          onClick={() => {
                            setSelectedNode(childNode);
                            setCurrentPath([...currentPath, childName]);
                          }}
                        >
                          {childNode.type === "directory" ? (
                            <Folder className="w-5 h-5 text-yellow-400" />
                          ) : (
                            <FileText className="w-5 h-5 text-green-400" />
                          )}
                          <div className="flex-1">
                            <div className={`font-medium ${childNode.type === "directory" ? "text-yellow-400" : "text-green-400"}`}>
                              {childNode.name}
                            </div>
                            <div className="text-xs text-gray-400">{childNode.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center">
                <Eye className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">Select a File or Directory</h3>
                <p className="text-gray-500">Click on any item in the file system tree to explore its purpose and philosophy.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Common Commands Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Essential Navigation Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">ls</code>
                <p className="text-sm text-gray-300 mt-1">List directory contents</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">cd</code>
                <p className="text-sm text-gray-300 mt-1">Change directory</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">pwd</code>
                <p className="text-sm text-gray-300 mt-1">Print working directory</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">tree</code>
                <p className="text-sm text-gray-300 mt-1">Display directory tree</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">find</code>
                <p className="text-sm text-gray-300 mt-1">Search for files and directories</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded p-4">
                <code className="text-green-400 font-semibold">du</code>
                <p className="text-sm text-gray-300 mt-1">Display directory space usage</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filesystem Hierarchy Standard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Filesystem Hierarchy Standard (FHS)</h3>
            <p className="text-gray-300 mb-4">
              The FHS defines the directory structure and contents of Linux systems. It ensures consistency
              across different distributions and helps users and applications know where to find things.
            </p>
            <div className="text-sm text-gray-400">
              <p>This standardization is part of what makes Linux powerful - predictability and consistency
              across systems allow scripts, applications, and users to function reliably regardless of
              the specific distribution.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
