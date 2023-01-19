import { useState } from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please click the button 👉");
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet("Hi!").then(updateResultText);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <span>{resultText}</span>
            <button className="btn" onClick={greet}>Greet</button>
        </div>
    )
}

export default App
