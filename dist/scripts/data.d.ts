export declare const restaurantsAndBars: ({
    name: string;
    type: string;
    localisation: {
        lat: number;
        long: number;
    };
    position?: undefined;
} | {
    name: string;
    type: string;
    position: {
        lat: number;
        long: number;
    };
    localisation?: undefined;
})[];
