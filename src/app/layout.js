import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "motion6 - AI-powered outreach",
  description: "Automate your outreach with motion6.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AppProvider>
          <Sidebar />
          <Header />
          <main className="pl-[var(--sidebar-width)] pt-16 min-h-screen">
            <div className="p-8">
              {children}
            </div>
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
