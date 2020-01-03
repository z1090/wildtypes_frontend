import { SightingLocation } from './location.model';

export class Sighting {
    constructor(
        public id: string,
        public userId: string,
        public date: Date,
        public typefaceName: string,
        public certainty: number,
        public businessName: string,
        public category: string,
        public useageRating: number,
        public location: SightingLocation,
        public photo: string
    ) { }
}
