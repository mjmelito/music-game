import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SpotifyService from "./spotify-service.js";

// Define game logic functions
let score = 0;
let lives = 3;
const correctAnswer = "The Name of the Correct Song";

function incrementScore() {
  score++;
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.textContent = `Score: ${score}`;
}

function startRound() {
  // play the preview of the first track from the playlist
  SpotifyService.playTrack(access_token);
  
  // set the value of the correct-answer element to the correct song name
  const correctAnswerElement = document.getElementById("correct-answer");
  correctAnswerElement.textContent = correctAnswer;
}

function decrementLives() {
  lives--;
  const livesDisplay = document.getElementById("lives");
  livesDisplay.textContent = `Lives: ${lives}`;
}

function endGame() {
  // perform actions to end the game
}

function handleSubmission(event) {
    event.preventDefault();
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.trim();
    guessInput.value = "";
  
    if (!guess) {
      return;
    }
  
    const result = document.getElementById("result");
    const correctAnswer = document.getElementById("correct-answer").textContent;
    if (guess.toLowerCase() === correctAnswer.toLowerCase()) {
      result.textContent = "Correct!";
      result.classList.add("correct");
      incrementScore();
      startRound();
    } else {
      result.textContent = "Wrong!";
      result.classList.add("wrong");
      decrementLives();
    }
  
    if (lives === 0) {
      endGame();
    }
  }
  
  window.addEventListener("load", function () {
    // Request token from Spotify API
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(process.env.Client_ID + ':' + process.env.Client_Secret).toString('base64')
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
  
    fetch(authOptions.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(process.env.Client_ID + ':' + process.env.Client_Secret).toString('base64')
      },
      body: 'grant_type=client_credentials'
    })
      .then(response => response.json())
      .then(data => {
        const access_token = data.access_token;
        console.log('OAuth token:', access_token);
  
        // Use the access_token to make API calls
        SpotifyService.playTrack(access_token);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    document
      .querySelector("form")
      .addEventListener("submit", handleSubmission);
  });
  
  