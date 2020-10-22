import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: 'app-arc-gismap',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Output() wonderMapped = new EventEmitter(); // notifies the dashboard component when thw map is finished
   @ViewChild('mapViewNode', {static:true}) private viewNode: ElementRef; 
  // needed to inject the MapView int the DOM
  mapView: __esri.MapView;

  constructor() {
  }

  panMap = (coordinates) => {
    return new Promise((resolve, reject) => {
      this.mapView.goTo(coordinates)
      .then(() => {
        this.mapView.zoom = 18;
        setTimeout(() => {
          this.wonderMapped.emit();
        }, 2000);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  ngOnInit(){
    // use esri-loader to load JSAPI modules
    return loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/Graphic'
    ]).then(([Map, MapView, Graphic]) => {
      const map: __esri.Map = new Map({
        basemap: 'streets'
      });

      this.mapView = new MapView({
        container: this.viewNode.nativeElement,
        center:[-12.287, -37.114],
        zoom:15,
        map
      });
    }).catch(err => {
      console.log(err);
    })
  }
}
