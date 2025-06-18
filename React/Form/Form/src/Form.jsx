import { useState } from "react"

export default function Form()
{
    let [formData,setFormData] = useState({
        fullName:"",
        username:""
    });
    
    let handleInput = (event)=>{
        let fieldName = event.target.name;
        let newVal = event.target.value;

        setFormData((curr)=>{
              curr[fieldName] = newVal;
              return {...curr};
        });
    };

    let handlesubmit= (event )=>{
        event.preventDefault();
        console.log(formData);
        setFormData(
            {
                fullName:"",
                username:""
            }
        )
    }


    return (
        <form onSubmit={handlesubmit}>
            <label htmlFor="fullName">Full Name: </label>
            <input placeholder="Enter anything"
             id="fullName" value={formData.fullName} 
             onChange={handleInput} 
             name="fullName" ></input>
           
          <br></br>
          <label htmlFor="username">UserName: </label>
            <input placeholder="Enter Username"
             id="username" value={formData.username} 
             onChange={handleInput}  
             name="username"></input>
            <button>Submit</button>
        </form>
    )
}