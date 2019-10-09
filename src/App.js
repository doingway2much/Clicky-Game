import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import './App.css';
import heros from "./cards.json";


class App extends Component {
  // Setting this.state.heros to the cards json array
  state = {
    heros,
    clickedHeroIds: [],
    score: 0,
    goal: 10,
    status: ""
  };

  //shuffle the pup cards in the browser when clicked
  shuffleScoreCard = id => {
    let clickedHeroIds = this.state.clickedHeroIds;

    if(clickedHeroIds.includes(id)){
      this.setState({ clickedHeroIds: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
      return;
    }else{
      clickedHeroIds.push(id)

      if(clickedHeroIds.length === 10){
        this.setState({score: 10, status: "You Won! Great Job, Smartie! Click to play again!", clickedHeroIds: []});
        console.log('You Win');
        return;
      }

      this.setState({ heros, clickedHeroIds, score: clickedHeroIds.length, status: " " });

      for (let i = heros.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [heros[i], heros[j]] = [heros[j], heros[i]];
      }
    }
  }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hero Clicky App</h1>
          <p className="App-intro">
            Try not to click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={10}
               status={this.state.status}
               />
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
          <p>Designed and built by Seth Randell. You can find the
          code<a href="https://github.com/doingway2much/clicky-game" target="_blank" rel="noopener noreferrer"> here</a>.</p>
        </footer>
    </div>
    );
  }
}

export default App;
