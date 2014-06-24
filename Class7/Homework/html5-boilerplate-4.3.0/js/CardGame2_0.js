
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.showRank = function() {
    var ranks = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"]
    return ranks[this.rank - 1]
  }
  this.show = function() {
    var suits = ["Hearts", "Spades", "Diamonds", "Clubs"]
    return this.showRank() + " of " + suits[this.suit - 1]
  }
}

function Deck() {
  this.cards = [];
  this.count = function() {
    return this.cards.length;
  }
  this.init = function() {
    for (s = 1; s <= 4; s++){
      for (r = 1; r <= 13; r++) {
        this.cards.push(new Card(r, s))
      }
    }
  }
}

function Table() {
  var p1Score = 0, p2Score = 0, p1Card, p2Card, queue;
  deck = new Deck();
  deck.init();
  
  // queue tracks the order of cards dealt.
  queue = [];

  function deal() {
    var index = Math.floor(Math.random() * deck.cards.length)
    var selectedCard = deck.cards[index];

    deck.cards.splice(index, 1);

    return selectedCard;
  }

  function showRound(winner) {
    var roundWinner

    console.log("Player 1: " + p1Card.show());
    console.log("Player 2: " + p2Card.show());

    switch(winner) {
      case 1:
        console.log("Player 1 wins the round!\n");
        roundWinner = "Player 1 wins the round!";
        break;
      case 2:
        console.log("Player 2 wins the round!\n");
        roundWinner = "Player 2 wins the round";
        break;
      case 3:
        console.log("Round is a draw!\n");
        roundWinner = "Round is a draw!"
        break;
    }

    // Populates an ordered list of round statistics for the War game.
    $("#warGame").append("<li>Player 1: &nbsp&nbsp" + p1Card.show() + "<br>"
      + "Player 2: &nbsp&nbsp" + p2Card.show() + "<br>"
      + roundWinner + "</li>")
  }

  function showScore() {
    console.log("Player 1 scored " + p1Score + " points.");
    console.log("Player 2 scored " + p2Score + " points.");

    // Displays the final score in the HTML markup
    $("#score").append("Player 1 scored " + p1Score + " points." +
      "<br>" + "Player 2 scored " + p2Score + " points.")
  }

  function showQueue() {
    console.log("\nThe order of the deck for this game was:")

    while(queue.length != 0) {
      var card = queue.shift();
      console.log(card.show());

      // Displays the order of the deck in the HTML markup
      $("#deckOrder").append("<li>" + card.show() + "</li>")
    }
  }

  for (var i=0; i < 26; i++) {
    p1Card = deal();
    p2Card = deal();
    queue.push(p1Card);
    queue.push(p2Card);
    
    if (p1Card.rank > p2Card.rank) {
      showRound(1);
      p1Score++
    }
    else if (p1Card.rank < p2Card.rank) {
      showRound(2)
      p2Score++
    } 
    else {
      showRound(3)
    }
  }

  showScore();

  if(p1Score > p2Score) {
    console.log("Player 1 is the winner!");
    $("#score").append("<br>Player 1 is the winner!");
    showQueue();
  }
  else if(p1Score < p2Score) {
    console.log("Player 2 is the winner!");
    $("#score").append("<br>Player 2 is the winner!");
    showQueue();
  }
  else {
    console.log("The game was a draw.")
    $("#score").append("<br>The game was a draw.");
    showQueue();   
  }
}

//Play = Table();

$("#playButton").click(function() {
  Table();
  $("#aside").show();
  $(this).hide();
});