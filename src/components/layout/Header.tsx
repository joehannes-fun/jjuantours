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
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/85 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between py-3">
        <Link to="/#top" className="group flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-teal-500 text-lg shadow-lg">
            🏝️
          </div>
          <h1 className="hidden text-2xl font-bold text-slate-900 transition group-hover:text-teal-700 sm:block">
            {brandSettings.brandName}
          </h1>
        </Link>

        <button className="md:hidden text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <HiX className="h-8 w-8" /> : <HiMenu className="h-8 w-8" />}
        </button>

        <nav
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-5 border-b border-slate-200 bg-white px-6 py-5 md:static md:flex md:flex-row md:items-center md:gap-7 md:border-0 md:bg-transparent md:p-0`}
        >
          <Link to="/#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-teal-700">
            <MdHome />
            <FormattedMessage id="nav.home" />
          </Link>
          <Link to="/tours#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-teal-700">
            <MdTour />
            <FormattedMessage id="nav.tours" />
          </Link>
          <Link to="/transport#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-teal-700">
            <MdLocalTaxi />
            <FormattedMessage id="nav.transport" defaultMessage="Transport" />
          </Link>
          <Link to="/contact#top" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 font-medium text-slate-700 hover:text-teal-700">
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
