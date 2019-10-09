import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import "./App.css";
import heros from "./cards.json";

class App extends Component {
  state = {
    heros,
    clickedHeroIds: [],
    score: 0,
    goal: 10,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedHeroIds = this.state.clickedHeroIds;

    if (clickedHeroIds.includes(id)) {
      this.setState({
        clickedHeroIds: [],
        score: 0,
        status:
          "Game Over! Click on any of the images to try your luck again!!!!!"
      });
      return;
    } else {
      clickedHeroIds.push(id);

      if (clickedHeroIds.length === 10) {
        this.setState({
          score: 10,
          status: "You Won! Awesome, Click to play again!",
          clickedHeroIds: []
        });
        console.log("You Win");
        return;
      }

      this.setState({
        heros,
        clickedHeroIds,
        score: clickedHeroIds.length,
        status: " "
      });

      for (let i = heros.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [heros[i], heros[j]] = [heros[j], heros[i]];
      }
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div id="App-logo">
          <h1 className="App-title">MARVEL Hero Guessing game</h1>
          <p className="App-intro">The object of the game is to click on as many hero's as you can with out clicking on them twice.</p>
        </div>
        </header>
        <Score total={this.state.score} goal={10} status={this.state.status} />
        <Wrapper>
          {this.state.heros.map(Hero => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={Hero.id}
              key={Hero.id}
              image={Hero.image}
            />
          ))}
        </Wrapper>
        <footer>
        <div className="App-footer">
          <p>
            Designed and built by Seth Randell. You can find the code
            <a
              href="https://github.com/doingway2much/clicky-game"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              here
            </a>
            .
          </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
