import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import useParallax from '../hooks/useParallax';
import { useBrand } from '../contexts/BrandContext';

interface HeroProps {
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundImage }) => {
  const parallaxOffset = useParallax(0.2);
  const { brandSettings } = useBrand();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(132deg, rgba(12,17,44,.84), rgba(10,111,126,.72), rgba(255,111,97,.42)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      <div className="section-shell flex min-h-[86vh] items-center py-20">
        <div className="glass-card relative max-w-3xl rounded-[2.2rem] border border-white/40 p-8 shadow-2xl md:p-12">
          <span className="mb-4 inline-flex rounded-full border border-teal-200/70 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-cyan-800">
            Bávaro · Punta Cana · Dominican Republic
          </span>
          <h1 className="mb-5 text-5xl font-bold leading-tight text-slate-900 drop-shadow-sm md:text-7xl">
            <FormattedMessage id="hero.title" values={{ brand: brandSettings.brandName }} />
          </h1>
          <p className="mb-8 max-w-2xl text-lg font-medium text-slate-700 md:text-xl">
            <FormattedMessage id="hero.subtitle" />
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/tours#top" className="tropical-button">
              <FormattedMessage id="hero.cta" />
            </Link>
            <Link to="/transport#top" className="tropical-button-outline">
              <FormattedMessage id="nav.transport" defaultMessage="Transport" />
            </Link>
            <Link to="/contact#top" className="tropical-button-outline">
              <FormattedMessage id="contact.title" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
