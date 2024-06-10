import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import logo from "@/public/images/logo.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thesis VDU Doctor App",
  description:
    "A comprehensive doctor appointment and management application developed for VDU as part of a thesis project. Schedule appointments, manage patient records, and streamline hospital operations efficiently.",
  keywords:
    "VDU, doctor app, appointment scheduling, patient management, hospital management, thesis project, healthcare application",
  author: "Kareem Bakarbashat",
  openGraph: {
    title: "Thesis VDU Doctor App",
    description:
      "Manage doctor appointments, patient records, and streamline hospital operations with our comprehensive healthcare application.",
    url: "https://doctor-appointment-git-main-kareem-s-projects.vercel.app",
    type: "website",
    images: [
      {
        url: logo.src,
        width: 800,
        height: 600,
        alt: "Thesis VDU Doctor App Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
        <meta
          property="og:image:alt"
          content={metadata.openGraph.images[0].alt}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <SpeedInsights />
        </AuthProvider>
      </body>
    </html>
  );
}
