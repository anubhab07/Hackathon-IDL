import {Coordinates} from "./coordinates"
export class Location {
    lastUpdated:string;
    intermediateLocations:Coordinates[];
    source:Coordinates;
    destination:Coordinates;
    zoom:number;
}
