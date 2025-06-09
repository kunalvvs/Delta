import { useState } from "react"
import "./Lottery.css"
import { getticket,sum } from "./Lottery";

export default function Lottery(){

    let [ticket,setTicket] = useState(getticket(3));

    let isWinning = sum(ticket)===15;

    let getNewTicket = () =>{
        setTicket(getticket(3));
    }

    return(
        <div>
            <h1>Lottery Game</h1>
            <div className="ticket">
            <span >
                {ticket[0]} </span>
              <span>{ticket[1]}</span>  
              <span> {ticket[2]}</span> 
             
            
           </div>
            <button onClick={getNewTicket}> New Ticket</button>
          <h3> {isWinning && "Congratulation you won"}</h3>
        </div>
    )
}