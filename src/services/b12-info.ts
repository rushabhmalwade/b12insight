/**
 * Represents information about Vitamin B12, including dosage recommendations.
 */
export interface B12Info {
  /**
   * A detailed description of Vitamin B12.
   */
  description: string;
  /**
   * The biological role of Vitamin B12.
   */
  biologicalRole: string;
  /**
   * The recommended daily dosage of Vitamin B12 in micrograms (mcg), by age group.
   */
  recommendedDosage: {
    /**
     * Dosage for infants (0-6 months).
     */
    infants0to6Months: number;
    /**
     * Dosage for infants (7-12 months).
     */
    infants7to12Months: number;
    /**
     * Dosage for children (1-3 years).
     */
    children1to3Years: number;
    /**
     * Dosage for children (4-8 years).
     */
    children4to8Years: number;
    /**
     * Dosage for children (9-13 years).
     */
    children9to13Years: number;
    /**
     * Dosage for adults (14+ years).
     */
    adults: number;
  };
}

/**
 * Asynchronously retrieves detailed information about Vitamin B12.
 *
 * @returns A promise that resolves to a B12Info object containing detailed information and dosage recommendations.
 */
export async function getB12Info(): Promise<B12Info> {
  // TODO: Implement this by calling an API or fetching from a database.

  return {
    description: 'Vitamin B12 is an essential nutrient...', // Shortened for brevity
    biologicalRole: 'Vitamin B12 plays a key role in...', // Shortened for brevity
    recommendedDosage: {
      infants0to6Months: 0.4,
      infants7to12Months: 0.5,
      children1to3Years: 0.9,
      children4to8Years: 1.2,
      children9to13Years: 1.8,
      adults: 2.4,
    },
  };
}
