import { Component, OnInit, AfterViewInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../core/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() places: any[];
  @Input() selectedPlace: any;
  @Output() selectPlace = new EventEmitter<any>();

  id = 'map';

  constructor(private map: MapService) {
    this.map.selectPlace.subscribe((place) => {
      if (place) {
        this.selectPlace.next(place);
      }
    })
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.map.initMap(this.id);
    this.map.addMarkers(this.places);
    this.map.selectMarker(this.selectedPlace);
  }

  ngOnChanges() {
    this.map.addMarkers(this.places);
    this.map.selectMarker(this.selectedPlace);
  }

}
