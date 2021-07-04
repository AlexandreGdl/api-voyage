import { Location } from "../interface/location.interface";
export declare class CreateVoyageDto {
    name: string;
    defaultName: string;
    startDate: Date;
    endDate: Date;
    cityName: string;
    location: Location;
}
