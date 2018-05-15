import {GoogleMapsAPIWrapper} from '@agm/core';
import { Directive,  Input} from '@angular/core';
import {MapLocationService} from './map-location.service'
declare var google: any;
@Directive({
  selector: '[agm-directions]'
})


export class MapDirectionDirective {
  @Input() origin;
  @Input() destination;
  @Input() dotted:boolean;
  constructor (private gmapsApi: GoogleMapsAPIWrapper,private _mapLocation:MapLocationService) {}
  
  ngOnInit(){
  
    this.gmapsApi.getNativeMap().then(map => {
      var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        fillOpacity: 1,
        scale: 3,
        
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
      suppressMarkers: true,
      polylineOptions: polylineDotted,
      preserveViewport: true
    };
    var directionsService = new google.maps.DirectionsService;
    if(this.dotted){
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    }
    else{
      var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
    }
    directionsDisplay.setMap(map);
    console.log(this.origin)
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

    var org=new google.maps.LatLng(this.origin.latitude,this.origin.longitude)
    var dest=new google.maps.LatLng(this.destination.latitude,this.destination.longitude);
    var distanceMatrixService=new google.maps.DistanceMatrixService();
    var vm=this;
    distanceMatrixService.getDistanceMatrix({
      origins:[org],
      destinations: [dest],
      travelMode: 'DRIVING'
    },(response,status)=>{
      if(status=='OK'){
        console.log(response.rows[0].elements[0].distance.text)
        this._mapLocation.remainingDistance=response.rows[0].elements[0].distance.text;
        this._mapLocation.remainingTime=response.rows[0].elements[0].duration.text;
      }
    })

    });
  }
}