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

export interface CrimeMapProps {
    latitude: number;
    longitude: number;
}

export interface Hotel {
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

export interface Coordinates {
    latitude: number;
    longitude: number;
}