export type Location = {
  id: string;
  value: string;
  label: string;
};

// assuming that the array is univoque (one time represented)
export const stringToLocation = (locations: string[]): Location[] => {
  return locations.map((l) => ({
    id: l.toLowerCase(),
    value: l.toLowerCase(),
    label: l,
  }));
};

export const locationsToString = (location: Location[]): string[] =>
  location.map((l) => l.label);
