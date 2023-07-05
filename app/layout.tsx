import "./globals.css";
import AuthProvider from "./AuthProvider";
import Navbar from "./components/NavBar";
export const metadata = {
  title: "Next-Neon App Starter",
  description: "Simple CRUD starter with Next.js, Neon, Prisma, and Tailwind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-zinc-900 text-yellow-50">
          <Navbar />
          <main className="max-w-[900px] mx-auto">{children}</main>
        </body>
      </html>
    </AuthProvider>
  );
}
