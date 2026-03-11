import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private http: HttpClient) {}

  searchSongs(query: string) {
    return this.http.get(`https://youtube-clone-backend-4bh4.onrender.com/api/youtube/search?q=${query}`);
  }

}