import React from 'react';
import { FormattedMessage } from 'react-intl';
import { MdSecurityUpdateGood, MdElectricBolt, MdDirectionsBus } from 'react-icons/md';

const Features = () => {
  return (
    <section className="py-20">
      <div className="section-shell">
        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold text-slate-900 md:text-6xl">
            <FormattedMessage id="features.title" />
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[{
            icon: <MdSecurityUpdateGood className="h-10 w-10 text-cyan-700" />,
            title: 'features.safety.title',
            text: 'features.safety.description',
          }, {
            icon: <MdElectricBolt className="h-10 w-10 text-fuchsia-600" />,
            title: 'features.experiences.title',
            text: 'features.experiences.description',
          }, {
            icon: <MdDirectionsBus className="h-10 w-10 text-orange-500" />,
            title: 'features.transportation.title',
            text: 'features.transportation.description',
          }].map((item) => (
            <article key={item.title} className="glass-card rounded-[2rem] border border-white/40 p-8 text-center shadow-xl">
              <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[26px] bg-gradient-to-br from-white to-cyan-50 shadow-lg">{item.icon}</div>
              <h3 className="mb-3 text-2xl font-bold text-slate-900">
                <FormattedMessage id={item.title} />
              </h3>
              <p className="text-slate-600">
                <FormattedMessage id={item.text} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
