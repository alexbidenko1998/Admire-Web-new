import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PlacesService} from '../services/places.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {OpenedPlaceComponent} from './opened-place/opened-place.component';
import {EventsService} from '../services/events.service';
import {OpenedEventComponent} from './opened-event/opened-event.component';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private platform: any;
  private map: any;

  private updateTimeout: number;

  private placesGroup = new H.map.Group();
  private eventsGroup = new H.map.Group();
  private pointsLastUpdate = {
    places: null,
    events: null
  };

  @ViewChild('map', {static: false})
  public mapElement: ElementRef;

  constructor(
    private placesService: PlacesService,
    private bottomSheet: MatBottomSheet,
    private eventsService: EventsService
  ) {
    this.platform = new H.service.Platform({
      app_id: 'UdRH6PlISTlADYsW6mzl',
      app_code: 'lfrrTheP9nBedeJyy1NtIA',
      useHTTPS: true
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const pixelRatio = window.devicePixelRatio || 1;
    const defaultLayers = this.platform.createDefaultLayers({
      lg : 'rus',
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi : pixelRatio === 1 ? undefined : 320
    });
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 10,
        center: { lat: 44.73, lng: 37.76 }
      },
      {
        pixelRatio
      }
    );

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

    const ui = H.ui.UI.createDefault(this.map, defaultLayers, 'ru-RU');

    const mapSettings = ui.getControl('mapsettings');
    const zoom = ui.getControl('zoom');
    const scalebar = ui.getControl('scalebar');
    const pano = ui.getControl('panorama');

    scalebar.setVisibility(false);

    mapSettings.setAlignment('bottom-center');
    zoom.setAlignment('bottom-center');
    pano.setAlignment('bottom-center');

    this.map.addEventListener('mapviewchange', () => {
      clearTimeout(this.updateTimeout);
      if (this.map.getZoom() > 12) {
        this.updateTimeout = setTimeout(() => {
          this.getPlacesData();
          this.getEventsData();
        }, 2000);
      }
    });

    this.map.addObject(this.placesGroup);
    this.map.addObject(this.eventsGroup);

    this.placesGroup.addEventListener('tap', event => {
      this.openBottomSheet('place', event.target.getData().data);
    });
    this.eventsGroup.addEventListener('tap', event => {
      this.openBottomSheet('event', event.target.getData().data);
    });
  }

  openBottomSheet(type: string, data: any) {
    let component;
    if (type === 'place') {
      component = OpenedPlaceComponent;
    } else {
      component = OpenedEventComponent;
    }
    // @ts-ignore
    this.bottomSheet.open(component, {
      data: { data },
      panelClass: 'bottom-sheet'
    });
  }

  getPlacesData() {
    if (
      this.pointsLastUpdate.places == null ||
      this.placesService.getDistance(this.map.getCenter(), this.pointsLastUpdate.places) > 1000
    ) {
      this.placesService.getPlaces(
        this.map.getCenter().lat,
        this.map.getCenter().lng,
        1
      ).subscribe(places => {
        this.placesGroup.removeAll();

        places.forEach(place => {
          this.placesGroup.addObject(
            this.createMarker(place.latitude, place.longitude, place.avatar_small, place)
          );
        });
      });
    }
  }

  getEventsData() {
    if (
      this.pointsLastUpdate.events == null ||
      this.eventsService.getDistance(this.map.getCenter(), this.pointsLastUpdate.events) > 5000
    ) {
      this.eventsService.getEvents(
        this.map.getCenter().lat,
        this.map.getCenter().lng
      ).subscribe(events => {
        this.eventsGroup.removeAll();

        events.forEach(event => {
          if (!!event.place) {
            this.eventsGroup.addObject(
              this.createMarker(event.place.latitude, event.place.longitude, event.photo_50, event)
            );
          }
        });
      });
    }
  }

  createMarker(latitude: number, longitude: number, icon: string, data: any): any {
    const domIcon = new H.map.DomIcon(`<div>
      <div style="
      border-radius: 50%;
      margin-top: -21px;
      margin-left: -21px;
      width: 42px;
      height: 42px;
      background: url(${icon}) no-repeat center / cover;
      border: 1px solid #999;" class="circle responsive-img"></div>
    </div>`);
    const position = {
      lat: latitude,
      lng: longitude
    };
    const marker = new H.map.DomMarker(position, {
      icon: domIcon, min: 13, max: 20
    });
    marker.setData({data});
    return marker;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.map.getViewPort().resize();
  }
}
