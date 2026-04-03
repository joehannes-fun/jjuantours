import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdHome, MdTour, MdLocalTaxi, MdEmail } from 'react-icons/md';
import LanguageSwitcher from '../LanguageSwitcher';
import { useBrand } from '../../contexts/BrandContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { brandSettings } = useBrand();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 shadow-[0_8px_24px_rgba(31,23,54,0.08)] backdrop-blur-2xl">
      <div className="section-shell flex items-center justify-between py-3">
        <Link to="/#top" className="group flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-[16px] bg-gradient-to-br from-orange-300 via-rose-300 to-cyan-500 text-lg shadow-lg">
            🏝️
          </div>
          <h1 className="hidden text-2xl font-bold text-slate-900 transition group-hover:text-cyan-700 sm:block">
            {brandSettings.brandName}
          </h1>
        </Link>

        <button className="text-slate-700 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <HiX className="h-8 w-8" /> : <HiMenu className="h-8 w-8" />}
        </button>

        <nav
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-5 border-b border-cyan-100 bg-white/95 px-6 py-5 shadow-xl md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <Link to="/#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700">
            <MdHome />
            <FormattedMessage id="nav.home" />
          </Link>
          <Link to="/tours#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700">
            <MdTour />
            <FormattedMessage id="nav.tours" />
          </Link>
          <Link to="/transport#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700">
            <MdLocalTaxi />
            <FormattedMessage id="nav.transport" defaultMessage="Transport" />
          </Link>
          <Link to="/contact#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 rounded-full px-3 py-2 font-semibold text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-700">
            <MdEmail />
            <FormattedMessage id="nav.contact" />
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
};

export default Header;
