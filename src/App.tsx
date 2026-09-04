import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import LogoStrip from '@/components/sponsors/LogoStrip';
import TracksSection from '@/components/tracks/TracksSection';
import RecapSection from '@/components/recap/RecapSection';
import ScheduleSection from '@/components/schedule/ScheduleSection';
import MentorsSection from '@/components/mentors/MentorsSection';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="logo-mark-thicken">
          <feMorphology operator="dilate" radius="1.1" />
        </filter>
      </svg>
      <Navbar />
      <Hero />
      <LogoStrip />
      <TracksSection />
      <RecapSection />
      <ScheduleSection />
      <MentorsSection />
      <Footer />
    </div>
  );
}

export default App;
