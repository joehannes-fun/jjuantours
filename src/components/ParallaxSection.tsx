import React from 'react';
import useParallax from '../hooks/useParallax';

const ParallaxSection: React.FC<{ backgroundImage: string; children: React.ReactNode }> = ({ backgroundImage, children }) => {
  const parallaxOffset = useParallax(0.15);

  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(17,36,58,.82), rgba(23,126,114,.72)), url('${backgroundImage}')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      <div className="section-shell">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white/10 p-10 text-center shadow-2xl backdrop-blur-sm">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
