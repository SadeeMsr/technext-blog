import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/ContextProviders/AuthProvider";
import SessionStorageProvider from "@/ContextProviders/SessionStorageProvider";
import CommentsProvider from "@/ContextProviders/CommentsProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Technext Blog",
  description:
    "Whether you’re looking to develop a custom web or mobile app, integrate AI into your product, or looking to build an offshore team, we’ve you covered! Hire from the same team of world-class developers who built MailBluster, Gradnet & ThemeWagon!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReduxProvider>
          <AuthProvider>
            <SessionStorageProvider>
              <CommentsProvider>
                <NavBar />
                <div className="px-20">{children}</div>
              </CommentsProvider>
            </SessionStorageProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
