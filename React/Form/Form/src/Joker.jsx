import { useEffect, useState } from "react";
//useeffect usecases
export default function Joker()
{
    let [joke,setJoke] = useState({});

    const URL = "https://official-joke-api.appspot.com/jokes/random";

    let getApi = async ()=>{
        let response = await fetch(URL);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        
        setJoke({
            setup: jsonResponse.setup, punchline: jsonResponse.punchline
        })
    }

    useEffect( ()=>{  //when we have to load joke first time on refresh
        async function getFirstJoke(){
           let response = await fetch(URL);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        
        setJoke({
            setup: jsonResponse.setup, punchline: jsonResponse.punchline
        })
    }
        getFirstJoke();
    },[])

    return(
        <div>
            <h3>{joke.setup}</h3>
            <h4>{joke.punchline}</h4>
<button onClick={getApi}>New Joke</button>
        </div>
    )
}