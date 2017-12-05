import {GoogleMapsAPIWrapper} from '@agm/core/services/google-maps-api-wrapper';
import { Directive,  Input} from '@angular/core';
declare var google: any;
@Directive({
  selector: '[agm-directions]'
})


export class MapDirectionDirective {
  @Input() origin;
  @Input() destination;
  @Input() dotted:boolean;
  constructor (private gmapsApi: GoogleMapsAPIWrapper) {}
  
  ngOnInit(){
  
    this.gmapsApi.getNativeMap().then(map => {
      var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3
    };
  
    var polylineDotted = new google.maps.Polyline({
        strokeColor: '#0eb7f6',
        strokeOpacity: 0,
        fillOpacity: 0,
        icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '10px'
        }],
    })
    var rendererOptions = {
      map: map,
      suppressMarkers: false,
      polylineOptions: polylineDotted
    };
    var directionsService = new google.maps.DirectionsService;
    if(this.dotted){
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    }
    else{
      var directionsDisplay = new google.maps.DirectionsRenderer();
    }
    directionsDisplay.setMap(map);
    directionsService.route({
      origin: {lat: this.origin.latitude, lng: this.origin.longitude},
      destination: {lat: this.destination.latitude, lng: this.destination.longitude},
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });

    });
  }
}