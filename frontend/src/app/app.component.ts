import { Component, OnInit, OnDestroy } from '@angular/core';

declare var YT: any;

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
title = 'My Music Player';
query = '';
songs: any[] = [];
currentSong: any;
currentIndex = 0;
isPlaying = false;
player: any;

progress = 0;
duration = 0;
currentTime = 0;
timer: any;

favorites: any[] = [];
currentPage: 'home' | 'library' = 'home';

ngOnInit() {
this.loadSuggestions();
const stored = localStorage.getItem('favorites');
if (stored) this.favorites = JSON.parse(stored);
}

ngOnDestroy() {
clearInterval(this.timer);
if (this.player) this.player.destroy();
}

goToHome() {
this.currentPage = 'home';
this.loadSuggestions();
this.query = '';
}

goToLibrary() {
this.currentPage = 'library';
}

loadSuggestions() {
fetch("/api/youtube/search?q=top songs")
.then(res => res.json())
.then(data => this.songs = data);
}

search() {
if (!this.query.trim()) return;
fetch(`/api/youtube/search?q=${encodeURIComponent(this.query)}`)
.then(res => res.json())
.then(data => this.songs = data);
}

play(song: any) {
this.currentSong = song;
this.currentIndex = this.songs.indexOf(song);

if (!this.player) {
  this.player = new YT.Player('hidden-player', {
    height: '0',
    width: '0',
    videoId: song.id.videoId,
    events: {
      'onReady': () => {
        this.player.playVideo();
        this.isPlaying = true;
        this.startProgress();
      },
      'onStateChange': (event: any) => {
        if (event.data === YT.PlayerState.ENDED) this.nextSong();
      }
    }
  });
} else {
  this.player.loadVideoById(song.id.videoId);
  this.player.playVideo();
  this.isPlaying = true;
  this.startProgress();
}


}

togglePlay() {
if (!this.player) return;


if (this.isPlaying) {
  this.player.pauseVideo();
} else {
  this.player.playVideo();
}

this.isPlaying = !this.isPlaying;


}

nextSong() {
this.currentIndex = (this.currentIndex + 1) % this.songs.length;
this.play(this.songs[this.currentIndex]);
}

prevSong() {
this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
this.play(this.songs[this.currentIndex]);
}

startProgress() {
clearInterval(this.timer);


this.timer = setInterval(() => {
  if (!this.player) return;

  this.duration = this.player.getDuration();
  this.currentTime = this.player.getCurrentTime();
  this.progress = (this.currentTime / this.duration) * 100;
}, 500);


}

seek(event: any) {
const seekTime = (event.target.value / 100) * this.duration;
this.player.seekTo(seekTime, true);
}

get progressBarStyle() {
return {
background: `linear-gradient(to right, #1db954 0%, #1db954 ${this.progress}%, #ccc ${this.progress}%, #ccc 100%)`
};
}

formatTime(seconds: number) {
const m = Math.floor(seconds / 60);
const s = Math.floor(seconds % 60);
return `${m}:${s < 10 ? '0' + s : s}`;
}

getSongTitle(title: string) {
return title
.split('|')[0]
.replace(/full video song|video song|official|lyrical|hd/gi, '')
.trim();
}

toggleFavorite(song: any) {
const index = this.favorites.findIndex(
f => f.id.videoId === song.id.videoId
);

if (index === -1) {
  this.favorites.push(song);
} else {
  this.favorites.splice(index, 1);
}

localStorage.setItem('favorites', JSON.stringify(this.favorites));

}

isFavorite(song: any) {
return this.favorites.some(
f => f.id.videoId === song.id.videoId
);
}
}
