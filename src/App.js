import logo from './logo.svg';
import './App.css';
import useWindowDimensions from "./utils/useWindowDimensions";
import {useEffect} from "react";
import useStorageChecker from "./utils/useStorageChecker";

function App() {

    const {height, width} = useWindowDimensions();
    const browserZoomLevel = Math.round(window.devicePixelRatio * 100);
    const {quota, used} = useStorageChecker();

    let clientInfo = {};
    try {
        clientInfo = window.client.getClientInfo()
    } catch (e) {
        console.log(e);
    }

    const divStyle = {
        width: '100%',
        margin: '12px',
    }

    return (
        <div className="App">
            <header className="App-header">
                <div align="left" style={divStyle}>
                    width: {width} ~ height: {height}
                </div>
                <div align="left" style={divStyle}>
                    window.devicePixelRatio : {window.devicePixelRatio}
                </div>
                <div align="left" style={divStyle}>User agent : {navigator.userAgent}</div>
                <div align="left" style={divStyle}>Signage info : {JSON.stringify(clientInfo)}</div>
                <div align="left" style={divStyle}>Storage size: {JSON.stringify(quota)} (MB)</div>
                <div align="left" style={divStyle}>Storage size used : {JSON.stringify(used)} (MB)</div>
                {/*<div>zoom level: {Math.round(window.devicePixelRatio * 100)}</div>*/}
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                {/*<p>*/}
                {/*  Edit <code>src/App.js</code> and save to reload.*/}
                {/*</p>*/}
                {/*<a*/}
                {/*  className="App-link"*/}
                {/*  href="https://reactjs.org"*/}
                {/*  target="_blank"*/}
                {/*  rel="noopener noreferrer"*/}
                {/*>*/}
                {/*  Learn React*/}
                {/*</a>*/}
            </header>
        </div>
    );
}

export default App;
