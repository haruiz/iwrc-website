import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.weedrecognition.org"),
  title: {
    default: "IWRC | International Weed Recognition Consortium",
    template: "%s | IWRC"
  },
  description:
    "IWRC connects a global weed science and precision agriculture community around sensor-based weed recognition, shared protocols, public datasets, and collaborative research.",
  openGraph: {
    title: "IWRC | International Weed Recognition Consortium",
    description:
      "A global consortium promoting sensor-based weed recognition for advanced weed research and precision weed control applications.",
    url: "https://www.weedrecognition.org",
    siteName: "IWRC",
    images: [
      {
        url: "/images/iwrc-og.svg",
        width: 1200,
        height: 630,
        alt: "Stylized weed recognition field imagery"
      }
    ],
    locale: "en_US",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
