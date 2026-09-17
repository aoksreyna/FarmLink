import { Kantumruy_Pro } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const kantumruy = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kantumruy",
  display: "swap",
});

export const metadata = {
  title: "FarmLink - វេទិកាតភ្ជាប់កសិករ និងអាជីវកម្ម",
  description: "B2B Agricultural marketplace connecting Cambodian farmers directly with businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="km" className={`${kantumruy.variable} ${kantumruy.className}`}>
      <body className="min-h-screen bg-gray-50 flex flex-col antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
