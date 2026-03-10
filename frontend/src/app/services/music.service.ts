import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) {}

  searchSongs(query: string) {
    return this.http.get(`http://localhost:5000/api/youtube/search?q=${query}`);
  }

}