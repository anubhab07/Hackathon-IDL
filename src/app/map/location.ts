import {Coordinates} from "./coordinates"
export class Location {
    lastUpdated:string;
    intermediateLocation:Coordinates;
    source:Coordinates;
    destination:Coordinates;
    zoom:number;
    deliveryMode:string;
    state:number;
}
