import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Linux Museum - Interactive Learning Through Immersive Storytelling",
  description: "Explore Linux concepts through an immersive virtual museum experience with interactive terminals, storytelling, and visual metaphors.",
  keywords: ["Linux", "Education", "Interactive", "Terminal", "Learning", "Museum", "Open Source"],
  authors: [{ name: "Linux Museum" }],
  creator: "Linux Museum",
  publisher: "Linux Museum",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ibmPlexMono.variable} ${jetBrainsMono.variable} antialiased bg-black text-green-400 font-mono`}
      >
        {children}
      </body>
    </html>
  );
}
