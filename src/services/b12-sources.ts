/**
 * Represents a source of Vitamin B12.
 */
export interface B12Source {
  /**
   * The name of the B12 source.
   */
  name: string;
  /**
   * A description of the B12 source.
   */
  description: string;
  /**
   * The category of the B12 source (e.g., Animal, Plant-Based, Supplement).
   */
  category: 'Animal' | 'Plant-Based' | 'Supplement';
}

/**
 * Asynchronously retrieves a list of Vitamin B12 sources.
 *
 * @returns A promise that resolves to an array of B12Source objects.
 */
export async function getB12Sources(): Promise<B12Source[]> {
  // TODO: Implement this by calling an API or fetching from a database.

  return [
    {
      name: 'Beef Liver',
      description: 'A rich source of Vitamin B12.',
      category: 'Animal',
    },
    {
      name: 'Fortified Soy Milk',
      description: 'A plant-based source of Vitamin B12.',
      category: 'Plant-Based',
    },
    {
      name: 'Cyanocobalamin Supplements',
      description: 'An oral supplement containing Vitamin B12.',
      category: 'Supplement',
    },
  ];
}
