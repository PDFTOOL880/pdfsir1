import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import { getDirection } from "@/i18n/config";
import { headers } from "next/headers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Background from "@/components/background";
import { GoogleAnalytics } from "@/components/providers/google-analytics";
import { GOOGLE_SERVICES } from "@/lib/google-services";
import { ConsentBanner } from "@/components/consent/ConsentBanner";
import { AdsenseProvider } from "@/components/providers/adsense-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "File Converter - Process Your Files Easily",
  description: "Professional tools for processing and converting PDF files, images, and documents",
  icons: {
    icon: '/favicon.png'
  },
  verification: {
    google: GOOGLE_SERVICES.searchConsole.verificationToken,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const headersList = headers();
  const lang = (await headersList).get("x-current-locale") || "ar";
  const dir = getDirection(lang as "ar" | "en");

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary/10 selection:text-primary`}
      >
        <ThemeProvider>
          <AuthProvider>
            <GoogleAnalytics gaId={GOOGLE_SERVICES.analytics.measurementId} />
            <div className="relative">
              <Background />
              <div className="relative flex min-h-screen flex-col text-content">
                <Header />
                <main className="flex-1 w-full">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <Toaster richColors position="top-center" />
            <ConsentBanner />
            <AdsenseProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
