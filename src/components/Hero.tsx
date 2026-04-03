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
        backgroundImage: `linear-gradient(120deg, rgba(17,36,58,.85), rgba(15,91,131,.7)), url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      <div className="section-shell flex min-h-[82vh] items-center py-20">
        <div className="glass-card max-w-3xl rounded-3xl p-8 md:p-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-teal-700">Bávaro · Punta Cana · Dominican Republic</p>
          <h1 className="mb-5 text-5xl font-bold leading-tight text-slate-900 md:text-7xl">
            <FormattedMessage id="hero.title" values={{ brand: brandSettings.brandName }} />
          </h1>
          <p className="mb-8 text-lg text-slate-700 md:text-xl">
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
