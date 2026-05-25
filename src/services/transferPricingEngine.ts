import { TransferConfig, TransferFormData, TransferPriceResult } from '../types/transport';
import { getMunicipioPriceMultiplier } from '../data/municipioPriceMultipliers';

export function calculateDistancePrice(
  config: TransferConfig,
  distanceKm: number,
  durationMinutes: number,
  originLabel: string,
  destinationLabel: string,
  data: TransferFormData
): TransferPriceResult {
  const vehicleData = config.vehicleTypes.find((v) => v.key === data.vehicleKey);
  if (!vehicleData) throw new Error(`Unknown vehicle type: ${data.vehicleKey}`);

  const { modifiers } = config;
  
  // Calculate municipio multiplier if municipios are available
  let municipioMultiplierApplied = 1.0;
  if (data.originMunicipio && data.destinationMunicipio) {
    const originMultiplier = getMunicipioPriceMultiplier(data.originMunicipio);
    const destinationMultiplier = getMunicipioPriceMultiplier(data.destinationMunicipio);
    // Average of the two municipio multipliers
    municipioMultiplierApplied = (originMultiplier + destinationMultiplier) / 2;
  }
  
  const pricePerKm = modifiers.pricePerKm * (vehicleData.pricePerKmMultiplier ?? 1) * municipioMultiplierApplied;
  const baseDistancePrice = pricePerKm * distanceKm;

  const maxDiscount = modifiers.distanceDiscountMaxPercent;
  const saturationKm = modifiers.distanceDiscountSaturationKm;
  const appliedDiscountPercent = maxDiscount * (1 - Math.exp(-Math.max(distanceKm, 0) / saturationKm));
  const discountAmount = Math.round(baseDistancePrice * (appliedDiscountPercent / 100) * 100) / 100;
  let discountedDistancePrice = baseDistancePrice - discountAmount;

  const minimumPrice = modifiers.minimumPrice;
  const minimumPriceApplied = discountedDistancePrice < minimumPrice;
  if (minimumPriceApplied) {
    discountedDistancePrice = minimumPrice;
  }

  let price = discountedDistancePrice * vehicleData.multiplier * modifiers.fuelVolatility;

  const threshold = vehicleData.passengerThreshold ?? (vehicleData.maxPassengers + 1);
  const passengerMultiplier = vehicleData.passengerMultiplier ?? 2;
  const passengerMultiplierApplied = data.passengers >= threshold ? passengerMultiplier : 1;
  if (data.passengers >= threshold) price *= passengerMultiplier;

  let nightFeeApplied = 1;
  if (data.nightTransfer) {
    price *= modifiers.nightFeeMultiplier;
    nightFeeApplied = modifiers.nightFeeMultiplier;
  }

  let roundTripApplied = 1;
  if (data.roundTrip) {
    price = price * 2 * modifiers.roundTripDiscount;
    roundTripApplied = 2 * modifiers.roundTripDiscount;
  }

  const waitingApplied = data.waitingHours * modifiers.waitingPerHour;
  price += waitingApplied;
  const childSeatsApplied = data.childSeats * modifiers.childSeat;
  price += childSeatsApplied;

  price *= modifiers.priceMarkup;

  return {
    originLabel,
    destinationLabel,
    vehicleLabel: vehicleData.label,
    passengers: data.passengers,
    roundTrip: data.roundTrip,
    estimatedPrice: Math.round(price),
    currency: config.currency,
    distanceKm,
    durationMinutes,
    originMunicipio: data.originMunicipio,
    destinationMunicipio: data.destinationMunicipio,
    breakdown: {
      distanceKm,
      pricePerKm: Math.round(pricePerKm * 100) / 100,
      baseDistancePrice: Math.round(baseDistancePrice * 100) / 100,
      discountAmount,
      finalDistancePrice: Math.round(discountedDistancePrice * 100) / 100,
      vehicleMultiplierApplied: vehicleData.multiplier,
      fuelVolatilityApplied: modifiers.fuelVolatility,
      nightFeeApplied,
      roundTripApplied,
      waitingApplied,
      childSeatsApplied,
      distanceDiscountPercent: Math.round(appliedDiscountPercent * 100) / 100,
      distanceDiscountMaxPercent: maxDiscount,
      distanceDiscountSaturationKm: saturationKm,
      markupApplied: modifiers.priceMarkup,
      minimumPriceApplied,
      municipioMultiplierApplied,
    },
  };
}
