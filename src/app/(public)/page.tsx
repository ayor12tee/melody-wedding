import HeroSection from '@/components/sections/HeroSection';
import EventDetails from '@/components/sections/EventDetails';
import RSVPSection from '@/components/sections/RSVPSection';
import GiftSection from '@/components/sections/GiftSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <EventDetails />
      <GiftSection />
      <RSVPSection />
    </>
  );
}
