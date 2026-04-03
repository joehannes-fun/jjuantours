const JSONBIN_MASTER_KEY = import.meta.env.VITE_JSONBIN_MASTER_KEY;
const JSONBIN_BRAND_BIN_ID = import.meta.env.VITE_JSONBIN_BRAND_BIN_ID;

export interface BrandSettings {
  brandName: string;
  phoneNumber: string;
  paypalMeLink: string;
  verifoneLink: string;
}

const defaultBrandSettings: BrandSettings = {
  brandName: 'Tours',
  phoneNumber: '+1 (809) 555-0123',
  paypalMeLink: 'https://www.paypal.com/paypalme/carlostours',
  verifoneLink: '',
};

const normalizeBrandSettings = (input: Partial<BrandSettings> | null | undefined): BrandSettings => ({
  brandName:
    typeof input?.brandName === 'string' && input.brandName.trim()
      ? input.brandName
      : defaultBrandSettings.brandName,
  phoneNumber:
    typeof input?.phoneNumber === 'string' && input.phoneNumber.trim()
      ? input.phoneNumber
      : defaultBrandSettings.phoneNumber,
  paypalMeLink:
    typeof input?.paypalMeLink === 'string' && input.paypalMeLink.trim()
      ? input.paypalMeLink
      : defaultBrandSettings.paypalMeLink,
  verifoneLink:
    typeof input?.verifoneLink === 'string' && input.verifoneLink.trim()
      ? input.verifoneLink
      : defaultBrandSettings.verifoneLink,
});

export const getBrandSettings = async (): Promise<BrandSettings> => {
  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BRAND_BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': JSONBIN_MASTER_KEY,
      },
      cache: 'no-cache',
    });
    const data = await response.json();
    const brandData = data.record?.record || data.record || {};
    return normalizeBrandSettings(brandData);
  } catch (error) {
    console.error('Failed to fetch brand settings:', error);
    return defaultBrandSettings;
  }
};

export const saveBrandSettings = async (settings: BrandSettings): Promise<void> => {
  try {
    await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BRAND_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_MASTER_KEY,
      },
      body: JSON.stringify(settings),
    });
  } catch (error) {
    console.error('Failed to save brand settings:', error);
  }
};
