import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import Features from '../components/Features';
import ParallaxSection from '../components/ParallaxSection';
import TourCard from '../components/TourCard';
import { Tour, getExampleTours, getTransportServices } from '../services/toursService';
import { useI18n } from '../contexts/I18nContext';
import { useBrand } from '../contexts/BrandContext';

const HERO_BACKGROUND_IMAGE = 'https://iili.io/fa6E1Sa.jpg';

const Home: React.FC = () => {
  const { locale } = useI18n();
  const { brandSettings } = useBrand();
  const [examples, setExamples] = useState<Array<Tour & { targetPath: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExamples = async () => {
      setLoading(true);
      const [fetchedTours, fetchedTransport] = await Promise.all([
        getExampleTours(locale),
        getTransportServices(locale),
      ]);

      const nextExamples: Array<Tour & { targetPath: string }> = [];
      if (fetchedTours[0]) {
        nextExamples.push({ ...fetchedTours[0], targetPath: '/tours#top' });
      }
      if (fetchedTransport[0]) {
        nextExamples.push({ ...fetchedTransport[0], targetPath: '/transport#top' });
      }

      setExamples(nextExamples);
      setLoading(false);
    };

    loadExamples();
  }, [locale]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center">Loading...</div>;
  }

  return (
    <div id="top">
      <Hero backgroundImage={HERO_BACKGROUND_IMAGE} />

      <section className="py-20">
        <div className="section-shell text-center">
          <h2 className="mb-4 text-5xl font-bold text-slate-900">
            <FormattedMessage id="tours.title" />
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-slate-600">
            <FormattedMessage id="tours.dynamicSubtitle" values={{ brand: brandSettings.brandName }} />
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
            {examples.map((example) => (
              <TourCard
                key={`${example.targetPath}-${example.id}`}
                image={example.image}
                title={example.title}
                description={example.description}
                price={example.price}
                pricingOptions={example.pricingOptions}
                excursionName={example.title}
                detailsPath={example.targetPath}
                enabled={false}
                showPrice={false}
                showDetailsLink={false}
              />
            ))}
          </div>
        </div>
      </section>

      <ParallaxSection backgroundImage="https://picsum.photos/1200/800?random=jungle">
        <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          <FormattedMessage id="parallax.title" />
        </h2>
        <p className="text-lg text-white/90 md:text-xl">
          <FormattedMessage id="parallax.subtitle" />
        </p>
      </ParallaxSection>

      <Features />
      <Testimonials />
    </div>
  );
};

export default Home;
