export interface Coordinates {
    lat: number;
    lng: number;
}

export interface SightingLocation extends Coordinates {
    address: string;
    mapImage: string;
}

// export interface SightingLocationWithManualAddress {
//     manualAddress: string;
//     location: SightingLocation;
// }
