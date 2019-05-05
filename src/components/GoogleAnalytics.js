import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';

class GoogleAnalytics extends PureComponent {

    componentDidMount() {
        ReactGA.initialize('UA-139608339-1'); 
    }
    componentDidUpdate() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
    render() {
        return null;
    }
}

export default GoogleAnalytics;