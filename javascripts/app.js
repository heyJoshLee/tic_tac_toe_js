var game = {
  player_marker: "X",
  computer_marker: "O",
  player_squares: [],
  computer_squares: [],
  player_score: 0,
  computer_score: 0,
  winning_combos: [ [1,2,3],
                    [4,5,6],
                    [7,8,9],
                    [1,4,7],
                    [2,5,8],
                    [3,6,9],
                    [1,5,9],
                    [3,5,7]
                  ],

  open_spaces: [1,2,3,4,5,6,7,8,9],

  computerPickSpace: function () {
    var computer_space = this.open_spaces[Math.floor(Math.random() * this.open_spaces.length)],
        idx = game.open_spaces.indexOf(computer_space);
    this.computer_squares.push(this.open_spaces.splice(idx ,1)[0]);
    console.log(this.computer_squares)
    $("#square" + computer_space).addClass("unclickable").html(this.computer_marker);
  },

  checkWin: function () {
    var self = this;
    for(var i = 0; i < this.winning_combos.length; i++) {
      if ((self.winning_combos[i].every(function(val) { return self.player_squares.indexOf(val) >= 0; }))) {
        this.player_score++;
        $("#player_score > span").html(this.player_score);
        alert("Player wins!")
        return true;
      } else if ((self.winning_combos[i].every(function(val) { return self.computer_squares.indexOf(val) >= 0; }))) {
        this.computer_score++;
        $("#computer_score > span").html(this.player_score);
        alert("Computer wins.");
        return true;
      } else if (this.open_spaces.length <= 0) {
        alert("No winner.");
        return true;
      }
    }
  },

  reset: function() {
    this.player_squares = [];
    this.computer_squares = [];
    this.open_spaces = [1,2,3,4,5,6,7,8,9];
    $(".square").removeClass("unclickable").html("");
  }
}



$(".square").on("click", function() {

    var $this = $(this),
        idx = game.open_spaces.indexOf(+$this.attr("data-id"));
    
    $this.html(game.player_marker).addClass("unclickable");

    game.player_squares.push(game.open_spaces.splice(idx ,1)[0]);
    
    if (game.checkWin()) { 
      game.reset(); 
    } else if (game.open_spaces.length > 0) {
       game.computerPickSpace();
       if (game.checkWin()) {
        game.reset();
       }
    }
});


