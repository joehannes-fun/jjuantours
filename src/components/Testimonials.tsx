import React from 'react';
import { FormattedMessage } from 'react-intl';

const testimonials = [
  {
    name: 'Michael Johnson',
    feedback: 'Everything was well coordinated from pick-up to drop-off. Monkey Island exceeded our expectations.',
    location: 'New York, USA',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Ana Martinez',
    feedback: 'Swimming with dolphins was a dream come true! Highly recommend this tour vendor.',
    location: 'Madrid, Spain',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Oliver Thompson',
    feedback: 'The party boat was so much fun! Great music and beautiful views.',
    location: 'London, UK',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Elena Romano',
    feedback: 'The horseback riding through the jungle was breathtaking. A must-do in Punta Cana!',
    location: 'Rome, Italy',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="section-shell">
        <h2 className="mb-12 text-center text-5xl font-bold text-slate-900 md:text-6xl">
          <FormattedMessage id="testimonials.title" />
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <article key={index} className="glass-card rounded-[2rem] border border-white/40 p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-[18px] border-2 border-cyan-400 object-cover" />
                <div>
                  <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>
              <p className="italic leading-relaxed text-slate-600">"{testimonial.feedback}"</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
