import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './map/map.component';
import { MapService } from './core/map.service';
import { BarsService } from './core/bars.service';
import { AuthService } from './core/auth.service';
import { RatingComponent } from './shared/rating/rating.component';
import { SlimScrollModule } from "ng2-slimscroll";
import { SearchFormComponent } from './shared/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SearchComponent,
    MapComponent,
    RatingComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    SlimScrollModule
  ],
  providers: [MapService, BarsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
