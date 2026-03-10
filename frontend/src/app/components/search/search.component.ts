import { Component } from '@angular/core';
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  query = "";
  songs:any[] = [];

  constructor(private musicService: MusicService) {}

  search(){
    this.musicService.searchSongs(this.query).subscribe((res:any)=>{
      this.songs = res;
    });
  }

}