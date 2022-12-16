import React, { useEffect, useState } from "react";
import GameCicle from "./GameCircle";

import Header from "./Header";
import Footer from "./Footer";
import '../Game.css';

import { isDraw, isWinner,gameAIMoves } from "../Helper";
import {
    NO_PLAYER,
    No_Circle,
    PLAYER_1,
    PLAYER_2,
    GAME_STATE_PLAYING,
    GAME_STATE_DRAW,
    GAME_STATE_WIN,
} from "../constant";


const GameBoard = () => {

    const [gameBoard, setgameBoard] = useState(Array(No_Circle).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

    const [gameState,setgameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer,setWinPlayer] = useState(NO_PLAYER);

    console.log(gameBoard);

    useEffect(() =>{
        initGame();
    },[])

    const initGame = () => {
        console.log('init Game');
        setgameBoard(Array(No_Circle).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setgameState(GAME_STATE_PLAYING);
    }

    const initboard = () => {
        const circle = []
        for (let i = 0; i < No_Circle; i++) {
            circle.push(renderCircle(i));
        }

        return circle
    }

    const SuggestMove = () => {
        console.log("mu Suggest")
        circleClicked(gameAIMoves(gameBoard));
    }

    const circleClicked = (id) => {
        console.log("Clicked" + id);

        // No more double move on played circle should be conider

        if(gameBoard[id] !== NO_PLAYER ) return;

        // After one plyer win then no more chances

        if(gameState !== GAME_STATE_PLAYING) return;


        // const board = [...gameBoard]
        // board[id] = currentPlayer;
        // setgameBoard(board);

        // Efficent way to update array



        if (isWinner(gameBoard, id, currentPlayer)) {
            setgameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,id,currentPlayer)){
            setgameState(GAME_STATE_DRAW);
            setCurrentPlayer(NO_PLAYER);
        }
        setgameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            });
        });
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);

        console.log(gameBoard);
        console.log(currentPlayer)

    }


    const renderCircle = id => {
        return <GameCicle key={id} id={id} className={`player${gameBoard[id]}`} onCricleCliked={circleClicked} />
    }
    return (

        <>
            <Header gameState = {gameState} player={currentPlayer} winPlayer = {winPlayer} />
            <div className="gameboard">

                {initboard()}

            </div>
            <Footer onNewGame = {initGame} onSuggest = {SuggestMove} gameState = {gameState} />
        </>
    )
}

export default GameBoard;