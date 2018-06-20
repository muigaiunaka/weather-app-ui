import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import ExampleComponent from './components/ExampleComponent';
import WeatherApp from './WeatherApp/WeatherApp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className="App">
        <WeatherApp />
      </div>
    );
  }
}

export default App;
