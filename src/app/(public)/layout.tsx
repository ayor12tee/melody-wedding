import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/ui/MusicPlayer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, marginTop: '70px' }}>
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </>
  );
}
