import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }
  title="AGM"
  lat: number = 20.295971;
  lng: number = 85.825023;
  zoom: number = 15;
  ngOnInit() {
  }

}
