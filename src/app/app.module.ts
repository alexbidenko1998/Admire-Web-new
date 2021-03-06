import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { MainComponent } from './main/main.component';
import {MatBottomSheetModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { MapComponent } from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import { OpenedPlaceComponent } from './map/opened-place/opened-place.component';
import { OpenedEventComponent } from './map/opened-event/opened-event.component';
import { PlacesComponent } from './main/places/places.component';
import { HeaderComponent } from './main/header/header.component';
import { PlaceCardComponent } from './main/places/place-card/place-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MapComponent,
    OpenedPlaceComponent,
    OpenedEventComponent,
    PlacesComponent,
    HeaderComponent,
    PlaceCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatBottomSheetModule,
    MatChipsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OpenedPlaceComponent,
    OpenedEventComponent
  ]
})
export class AppModule { }
