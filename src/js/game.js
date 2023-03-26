export default class Game {
    constructor() {
      this.currentTrack = null;
      this.startTime = null;
      this.isPlaying = false;
      this.score = 0;
      this.accessToken = null;
    }
    getExchange() {
        return SpotifyService.getAccessToken()
          .then((exchange) => {
            this.accessToken = exchange.access_token;
          });
      }
    
      getRandomTrack() {
        return SpotifyService.getPlaylistTracks(this.accessToken)
          .then((tracks) => {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            this.currentTrack = tracks[randomIndex];
          });
      }
    
      playTrack() {
        const previewUrl = this.currentTrack.track.preview_url;
        this.isPlaying = true;
        const audio = new Audio(previewUrl);
        audio.play();
        this.startTime = Date.now();
      }
    
      handleGuess(guess) {
        const correctAnswer = this.currentTrack.track.name;
        if (guess === correctAnswer) {
          const elapsedTime = Date.now() - this.startTime;
          const points = Math.max(0, 10000 - elapsedTime);
          this.score += points;
          return true;
        } else {
          return false;
        }
      }
}