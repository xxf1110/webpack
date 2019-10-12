import React, { Component } from 'react';
import './style/index.scss'


class App extends Component {
  render() {
    let src = '/static/test.png'
    return (
      <div>
        <h1 id='btn'>hello world</h1>
        <img src={src } alt=""/>
      </div>
    );
  }
}

export default App;