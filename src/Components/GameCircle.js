import React from "react";
import '../Game.css'


const GameCicle = ({id,children,className,onCricleCliked}) =>{
    // const onClick = (ev,id) => {
    //     onCricleCliked(id);
    // }
    
    return(
        <div className={`gamecircle ${className}`}  onClick= {() => onCricleCliked(id)}>
          {children}
        </div>
    )
}

export default GameCicle;