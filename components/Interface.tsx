export interface Crime {
    persistent_id: string;
    category: string;
    location: {
        latitude: string
        street: {
            name: string;
        }
        longitude: string;
    };
}

export interface MapProps {
    hotels: Hotel[];
}

export interface CrimeMapProps {
    latitude: number;
    longitude: number;
}

export interface HotelMapProps {
    hotels: Hotel[]
}

export interface HotelFromAPI {
    properties: {
        name: string;
        address_line2: string;
        county: string;
        postcode: string;
        street: string;
        lat: string;
        lon: string;
        website: string;
    };
}

export interface Hotel {
    id?: string;
    name: string;
    address_line2: string;
    county: string;
    postcode: string;
    street: string;
    lat: string;
    lon: string;
    website: string;
    crimesTotal?: number;
    crimes?: CrimeFS[];
}

export interface CrimeFS {
    category: string;
    lat: string;
    lon: string;
    month: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface CrimeDetail {
    category: string;
    month: string;
    count: number;
}

