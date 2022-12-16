import React from "react";
import '../Game.css';

import {
    GAME_STATE_PLAYING,
    GAME_STATE_WIN,
    GAME_STATE_DRAW,
} from "../constant"

const Header = ({gameState,player,winPlayer}) => {

    const renderLable = () =>{
        switch(gameState){
            case GAME_STATE_PLAYING:
                return  <div className="header-text">
                Player {player} Turn
            </div> 
            case GAME_STATE_WIN:
                return  <div className="header-text">
                Player {winPlayer} Wins
            </div> 
            case GAME_STATE_DRAW:
                return <div className="header-text">
                Game is Draw
            </div> 
            default:
        }

    }
    return(
    <div className="panel1 header">
        {renderLable()}
    </div>

    );
};

export default Header;