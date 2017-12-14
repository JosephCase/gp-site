import React, { Component } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ActivePageContent from './containers/ActivePageContent.js';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ActivePageContent />
        <Footer />
      </div>
    );
  }
}

export default App;
