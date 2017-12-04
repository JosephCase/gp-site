import React, { Component } from 'react';
import Header from './sections/header';
import Footer from './sections/footer';
import Main from './sections/main';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
