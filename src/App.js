import React, { Component } from 'react';
import Header from './sections/header';
import Footer from './sections/footer';
import Router from './sections/router';
import ActivePageContent from './components/activePageContent.js';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router />
        <Header />
        <ActivePageContent />
        <Footer />
      </div>
    );
  }
}

export default App;
