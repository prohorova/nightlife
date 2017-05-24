import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import constants from './constants';
declare let google: any;
declare let MarkerClusterer: any;

@Injectable()
export class MapService {

  private map: any;
  private markers: any[] = [];
  private selectedMarker: any;
  private markerCluster: any;

  private markerIcon: any;
  private markerIconHighlight: any;

  private markerManager: BehaviorSubject<Event> = new BehaviorSubject(null);
  public selectPlace: Observable<any>;

  constructor() {
    this.selectPlace = this.markerManager.asObservable();
  }

  initMap(id) {
    const mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: constants.mapTypeControl,
      streetViewControl: constants.streetViewControl,
      styles: constants.mapStyles
    };

    this.map = new google.maps.Map(document.getElementById(id), mapProp);

    this.markerIcon = {
      url: "../../assets/img/map-marker-point.svg",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 0)
    };
    this.markerIconHighlight = {
      url: "../../assets/img/map-marker-point-highlight.svg",
      scaledSize: new google.maps.Size(40, 40),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 0)
    };
  }

  addMarkers(places: any[]) {
    if (this.map) {
      this.removeMarkers();
      let bounds = new google.maps.LatLngBounds();
      if (places && places.length) {
        places.forEach(place => {
          if (place.coordinates) {
            let position = new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude);
            let marker = new google.maps.Marker({
              position: position,
              icon: this.markerIcon,
              place_obj: place
            });
            google.maps.event.addListener(marker, 'mouseover', () => {
              marker.setIcon(this.markerIconHighlight);
            });
            google.maps.event.addListener(marker, 'mouseout', () => {
              if (marker !== this.selectedMarker) {
                marker.setIcon(this.markerIcon);
              }
            });
            google.maps.event.addListener(marker, 'click', () => {
              this.setSelectedMarker(marker);
              this.markerManager.next(marker.place_obj);
            });
            this.markers.push(marker);
            bounds.extend(position);
          }
        });
        this.markerCluster = new MarkerClusterer(this.map, this.markers,
          {
            styles: constants.markerClustererStyles
          });
        this.map.fitBounds(bounds);
      }
    }
  }

  removeMarkers() {
    if (this.markerCluster) {
      this.markerCluster.clearMarkers(null);
      this.markerCluster = null;
    }
    if (this.markers && this.markers.length) {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
    }
  }

  selectMarker(place) {
    if (place) {
      const markerToSelect = this.markers.find(marker => {
        return marker.place_obj.id === place.id;
      });
      if (markerToSelect) {
        this.setSelectedMarker(markerToSelect);
      }
    }
  }

  setSelectedMarker(marker) {
    if (this.selectedMarker) {
      this.selectedMarker.setIcon(this.markerIcon);
    }
    this.selectedMarker = marker;
    this.selectedMarker.setIcon(this.markerIconHighlight);
    this.map.setCenter(marker.getPosition());
    this.map.setZoom(19);
  }

}
