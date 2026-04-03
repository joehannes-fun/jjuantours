import React, { useCallback, useEffect, useState } from 'react';
import { getBrandSettings, saveBrandSettings, BrandSettings } from '../services/brandService';
import { getTours, saveTours, Tour } from '../services/toursService';
import { useI18n } from '../contexts/I18nContext';
import ServiceAdminPanel from '../components/admin/ServiceAdminPanel';

const Admin: React.FC = () => {
  const { locale } = useI18n();
  const [brandSettings, setBrandSettings] = useState<BrandSettings>({
    brandName: 'Tours',
    phoneNumber: '+1 (809) 555-0123',
    paypalMeLink: 'https://www.paypal.com/paypalme/tours',
    verifoneLink: '',
  });
  const [editingBrand, setEditingBrand] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchBrand = async () => {
      const fetchedBrand = await getBrandSettings();
      setBrandSettings(fetchedBrand);
    };
    fetchBrand();
  }, []);

  const loadTours = useCallback(async () => {
    const fetchedTours = await getTours(locale);
    setTours(fetchedTours);
  }, [locale]);

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="container mx-auto space-y-8 px-4">
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">Brand Settings</h2>
          {editingBrand ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                value={brandSettings.brandName}
                onChange={(event) => setBrandSettings({ ...brandSettings, brandName: event.target.value })}
                placeholder="Brand Name"
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />
              <input
                type="text"
                value={brandSettings.phoneNumber}
                onChange={(event) => setBrandSettings({ ...brandSettings, phoneNumber: event.target.value })}
                placeholder="Phone Number"
                className="rounded-2xl border border-slate-200 px-4 py-3"
              />
              <input
                type="text"
                value={brandSettings.paypalMeLink}
                onChange={(event) => setBrandSettings({ ...brandSettings, paypalMeLink: event.target.value })}
                placeholder="PayPal link"
                className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
              />
              <input
                type="text"
                value={brandSettings.verifoneLink}
                onChange={(event) => setBrandSettings({ ...brandSettings, verifoneLink: event.target.value })}
                placeholder="Verifone link"
                className="rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2"
              />
              <div className="flex gap-3">
                <button
                  onClick={async () => {
                    await saveBrandSettings(brandSettings);
                    setEditingBrand(false);
                  }}
                  className="rounded-full bg-teal-600 px-5 py-2 font-semibold text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingBrand(false)}
                  className="rounded-full bg-slate-200 px-5 py-2 font-semibold text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-slate-700">
              <p><strong>Brand:</strong> {brandSettings.brandName}</p>
              <p><strong>Phone:</strong> {brandSettings.phoneNumber}</p>
              <p><strong>PayPal:</strong> {brandSettings.paypalMeLink}</p>
              <p><strong>Verifone:</strong> {brandSettings.verifoneLink || '—'}</p>
              <button onClick={() => setEditingBrand(true)} className="mt-4 rounded-full bg-blue-600 px-5 py-2 font-semibold text-white">
                Edit Brand Settings
              </button>
            </div>
          )}
        </div>

        <ServiceAdminPanel
          title="Tours Admin"
          category="tours"
          services={tours}
          setServices={setTours}
          loadServices={loadTours}
          saveServices={(services) => saveTours(services, locale)}
          siblingAdminPath="/admin/transport"
          siblingAdminLabel="Go to Transport Admin"
        />
      </div>
    </div>
  );
};

export default Admin;
