console.log("connected")

function Quiz() {
  this.songs = [
    { artist: "David Bowie",  title: "Life on Mars",  audio: "David Bowie - Life On Mars.mp3", similarArtists: ["Lou Reed", "Iggy Pop", "The Velvet Underground"]},
    { artist: "Led Zeppelin",  title: "Whole Lotta Love",  audio: "Led Zeppelin - Whole Lotta Love.mp3", similarArtists: ["Aerosmith", "Deep Purple", "The Who"]},
    { artist: "Gorillaz",  title: "Feel Good Inc",  audio: "Gorillaz - Feel Good Inc.mp3", similarArtists: ["Blur", "LCD Soundsystem", "The Chemical Brothers"]},
    { artist: "Metronomy",  title: "The Bay",  audio: "Metronomy - The Bay.mp3", similarArtists: ["Friendly Fires", "Hot Chip", "The Rapture"]},
    { artist: "Tame Impala",  title: "Elephant",  audio: "Tame Impala - Elephant.mp3", similarArtists: ["Unknown Mortal Orchestra", "Beach House", "Real Estate"]},
    { artist: "The Doors",  title: "Break On Through",  audio: "The Doors - Break On Through.mp3", similarArtists: ["Jefferson Airplane", "Jimmy Hendrix", "The Kinks"]},
    { artist: "The Black Keys",  title: "Lonely Boy",  audio: "The Black Keys - Lonely Boy.mp3", similarArtists: ["The White Stripes", "Band of Skulls", "The Kills"]},
    { artist: "Blur",  title: "Girls and Boys",  audio: "Blur - Girls and Boys.mp3", similarArtists: ["Supergrass", "Pulp", "The Verve"]},
    { artist: "Daft Punk",  title: "One More Time",  audio: "Daft Punk - One More Time.mp3", similarArtists: ["Digitalism", "Justice", "The Chemical Brothers"]},
    { artist: "Franz Ferdinand",  title: "Take Me Out",  audio: "Franz Ferdinand - Take Me Out.mp3", similarArtists: ["Kaiser Chiefs", "Bloc Party", "Kasabian"]}
  ]

  this.artistsArray = [];
  this.answersArray = [];
  this.intervalId;
  this.timer;
  this.score = 0;
  this._shuffle(this.songs);
  this._createArtistArray();


var divSongs = ""

  for (i = 0; i < this.songs.length; i++) {
    divSongs += '<div class="song" id="' + this.songs[i].artist + '">';
    // divs += '<audio id="' + this.songs[i].title.split(" ").join("_") + '">';
    divSongs += '<audio id="song' + (i+1) + '">';
    divSongs += '<source src="music/' + this.songs[i].audio + '" type="audio/mpeg">';
    divSongs += 'Your browser does not support the audio tag.</audio></div>';
  }

  document.getElementById("container").innerHTML = divSongs;




};
//END OF CONSTRUCTOR

// PROTOTYPE //
Quiz.prototype._shuffle = function(array) {
  var i = 0;
  var j = 0;
  var temp = null;
  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};


Quiz.prototype._createArtistArray = function() {
  for (var i = 0; i < this.songs.length; i++) {
    this.artistsArray.push(this.songs[i].artist);
  }
};


Quiz.prototype.generateAnswers = function (correctAnswer) {
  var artistIndex = quiz.artistsArray.indexOf(correctAnswer);
  this.answersArray = quiz.songs[artistIndex].similarArtists;
  this.answersArray.push(correctAnswer);
  this._shuffle(this.answersArray);
  return this.answersArray;
};


Quiz.prototype.distributeAnswers = function (answersArray) {
  for (i = 0; i < this.answersArray.length; i++) {
    document.getElementById("answer" + (i + 1)).innerHTML = this.answersArray[i];
  }
};


Quiz.prototype.displayTimer = function () {
  $("#timer").html("0:30");
  var i = 29;
  that = this;
  this.intervalId = setInterval(function () {
      if (i > 10) {
        $("#timer").html("0:" + i);
      }
      else if (i > 0) {
        $("#timer").html("0:0" + i);
      }
      else {
        clearInterval(this.intervalId);
      }
    i--;
    that.timer = i+1;
  }, 1000);
}


Quiz.prototype.givePoints = function (answerClickedId, correctAnswer) {
  var userAnswer = document.getElementById(answerClickedId).innerHTML;
  document.getElementById("ready").innerHTML = "Next Song";
  if (userAnswer == correctAnswer) {
    this.score += this.timer * 100;
    $("#score").html(this.score);
    document.getElementById("instructions").innerHTML = "Correct! Click 'Next Song' when you are ready.";
    return true;
  }
  else {
    document.getElementById("instructions").innerHTML = "Wrong! Click 'Next Song' when you are ready.";
    return false;
  }
}


Quiz.prototype.playSong = function (idSongPlaying) {
  document.getElementById(idSongPlaying).play();
  var timeoutId = setTimeout(function () {
      document.getElementById(idSongPlaying).pause();
    }, 30000);
}




// _______END OF GAME PROTOTYPE_________


var quiz;


$(document).ready(function() {
quiz = new Quiz;
var correctAnswer = "";
var songNumber = 0;
var idSongPlaying = "";
var answerClickedId = "";



// ON CLICK PLAY-PAUSE SONG

$(".ready").on("click", function() {
  songNumber = songNumber + 1;
  idSongPlaying = "song" + songNumber;
  correctAnswer = ($('#' + idSongPlaying).closest("div").attr("id"));
  document.getElementById("instructions").innerHTML = "Guess the artist..."
  quiz.generateAnswers(correctAnswer);
  quiz.distributeAnswers(quiz.answersArray);
  quiz.playSong(idSongPlaying);
  quiz.displayTimer();


});

//END SONG CLICK



// START ANSWER CLICK

$(".answer").on("click", function() {
  answerClickedId = ($(this).attr("id"));
  document.getElementById(idSongPlaying).pause();
  clearInterval(quiz.intervalId);
  quiz.givePoints(answerClickedId, correctAnswer);

});



// Carry on with trying to compare answers. Works when id is hard coded, not reconstructed.






// Closing jQuery function
});
