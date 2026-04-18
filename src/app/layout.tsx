import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kamil-wasik.pl"),
  title: {
    default: "Kamil Wąsik — Web Developer",
    template: "%s | Kamil Wąsik",
  },
  description:
    "Portfolio web developera: projekty komercyjne i darmowe narzędzia online, w tym kreator CV pod różne stanowiska.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "/",
    siteName: "Kamil Wąsik — Portfolio",
    title: "Kamil Wąsik — Web Developer",
    description:
      "Nowoczesne strony i aplikacje webowe oraz praktyczne narzędzia online dla kandydatów szukających pracy.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamil Wąsik — Web Developer",
    description:
      "Portfolio i narzędzia online: projekty webowe, kreator CV oraz kolejne funkcje już wkrótce.",
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetBrainsMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-E4MV7NL1ER" />
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wdof9mxu8i");`}
      </Script>
    </html>
  );
}
