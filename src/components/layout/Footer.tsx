import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useBrand } from '../../contexts/BrandContext';

const Footer = () => {
  const { brandSettings } = useBrand();

  return (
    <footer className="mt-10 border-t border-slate-200 bg-slate-950 py-12 text-white">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-3xl text-white">{brandSettings.brandName}</h3>
            <p className="max-w-md text-slate-300">
              <FormattedMessage id="footer.description" />
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">
              <FormattedMessage id="footer.quickLinks" />
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link to="/#top" className="hover:text-amber-300"><FormattedMessage id="footer.home" /></Link></li>
              <li><Link to="/tours#top" className="hover:text-amber-300"><FormattedMessage id="footer.tours" /></Link></li>
              <li><Link to="/transport#top" className="hover:text-amber-300"><FormattedMessage id="footer.transport" defaultMessage="Transport" /></Link></li>
              <li><Link to="/contact#top" className="hover:text-amber-300"><FormattedMessage id="footer.contact" /></Link></li>
              <li>
                <Link to="/admin" className="inline-flex items-center gap-1 hover:text-amber-300">
                  <MdAdminPanelSettings />
                  <FormattedMessage id="footer.admin" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-6 text-sm text-slate-400">
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
