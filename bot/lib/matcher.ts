/**
 * Listing match engine.
 * Checks whether a scraped listing satisfies the user's search criteria.
 */
import type { ListingRecord, SearchCriteria } from './storage.ts';

export interface MatchResult {
  matched: boolean;
  reasons: string[];
  score: number; // 0–100
}

export function matchListing(
  listing: ListingRecord,
  criteria: SearchCriteria,
): MatchResult {
  const reasons: string[] = [];
  let score = 100;

  // District check
  if (criteria.districts.length > 0) {
    const listingDistrict = listing.district.toLowerCase();
    const matchesDistrict = criteria.districts.some((d) =>
      listingDistrict.includes(d.toLowerCase()),
    );
    if (!matchesDistrict) {
      reasons.push(`Bezirk "${listing.district}" nicht in Suchgebiet`);
      score -= 40;
    }
  }

  // City check
  if (criteria.cities.length > 0) {
    const listingLocation = listing.location.toLowerCase();
    const matchesCity = criteria.cities.some((c) =>
      listingLocation.includes(c.toLowerCase()),
    );
    if (!matchesCity) {
      reasons.push(`Stadt "${listing.location}" nicht in Suchgebiet`);
      score -= 40;
    }
  }

  // Size check
  if (listing.sizeSqm > 0) {
    if (listing.sizeSqm < criteria.minSizeSqm) {
      reasons.push(
        `Größe ${listing.sizeSqm}m² unter Minimum ${criteria.minSizeSqm}m²`,
      );
      score -= 30;
    }
    if (listing.sizeSqm > criteria.maxSizeSqm) {
      reasons.push(
        `Größe ${listing.sizeSqm}m² über Maximum ${criteria.maxSizeSqm}m²`,
      );
      score -= 10;
    }
  }

  // Warm rent check
  if (listing.rentWarm > 0 && listing.rentWarm > criteria.maxRentWarm) {
    reasons.push(
      `Warmmiete ${listing.rentWarm}€ über Maximum ${criteria.maxRentWarm}€`,
    );
    score -= 30;
  }

  // Cold rent check (secondary)
  if (
    listing.rentCold > 0 &&
    listing.rentWarm === 0 &&
    listing.rentCold > criteria.maxRentCold
  ) {
    reasons.push(
      `Kaltmiete ${listing.rentCold}€ über Maximum ${criteria.maxRentCold}€`,
    );
    score -= 25;
  }

  // Availability check
  if (criteria.availableFrom && listing.availableFrom) {
    const desired = new Date(criteria.availableFrom).getTime();
    const available = new Date(listing.availableFrom).getTime();
    if (!isNaN(desired) && !isNaN(available) && available > desired) {
      const diffDays = (available - desired) / (1000 * 60 * 60 * 24);
      if (diffDays > 60) {
        reasons.push(`Verfügbar erst ab ${listing.availableFrom}`);
        score -= 15;
      }
    }
  }

  score = Math.max(0, score);

  return {
    matched: score >= 60,
    reasons,
    score,
  };
}
