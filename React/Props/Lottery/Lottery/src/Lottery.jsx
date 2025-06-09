import Ticket from "./Ticket";
import {getticket,sum} from "./Lottery.js";
import { useState } from "react";

export default function Lottery({n,winningSum}){

    
    let [ticket,setTicket] = useState(getticket(n));

    let isWinning = sum(ticket)===winningSum;

    let getNewTicket = () =>{
        setTicket(getticket(n));
    }
      
        return (
            <div>
            <h1>Lottery Game</h1>
            <Ticket ticket={ticket} />
              <button onClick={getNewTicket}> New Ticket</button>
          <h3> {isWinning && "Congratulation you won"}</h3>
            </div>
        )
    
}