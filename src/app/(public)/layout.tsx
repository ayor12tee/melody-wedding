import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/ui/MusicPlayer";
import Preloader from "@/components/ui/Preloader";
import FloatingNotesBackground from "@/components/ui/FloatingNotesBackground";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Preloader />
      <Navbar />
      <FloatingNotesBackground />
      <main style={{ flex: 1, marginTop: '70px', position: 'relative', zIndex: 10 }}>
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </>
  );
}
