export interface Movie {
  Released: string;
  Actors: string;
  Country: string;
}

export interface Country {
  currencies: { name: string; symbol: string }[];
  flags: {
    png: string;
  };
}

export interface SecondMovie {
  Runtime: string;
  Country: string;
}

export interface CountryPopulation {
  population: number;
}
