export interface Coordinates {
    lat: number;
    lng: number;
}

export interface SightingLocation extends Coordinates {
    address: string;
    mapImage: string;
}
