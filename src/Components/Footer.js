import React from "react";
import '../Game.css';

import { GAME_STATE_PLAYING } from "../constant";
const Footer = ({onNewGame,onSuggest,gameState}) => {
    const checkThegameState = () => {
        if(gameState === GAME_STATE_PLAYING){
            return <button onClick={onSuggest}>Suggest</button> 
        }
        return <button onClick={onNewGame}>New Game</button>
    }
    return(
    <div className="panel1 footer">
        {checkThegameState()}
    </div>

    );
};

export default Footer;