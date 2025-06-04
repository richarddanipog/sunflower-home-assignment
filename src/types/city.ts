export interface ICoords {
  lat: number;
  lng: number;
}

export interface ICity {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: ICoords;
}
