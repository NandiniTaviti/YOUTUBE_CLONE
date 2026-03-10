import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { PlayerComponent } from './components/player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SongListComponent,
    PlayerComponent
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,
  FormsModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
