import { useState } from "react"

export default function CommentsForm()
{

    let [formData,setFormData] = useState({
        username:"",
        remark:"",
        rating: 5
    });

    let handleInput = (event)=>{
        setFormData((curr)=>{
            return {...curr ,[event.target.name]: event.target.value};
        });
    };

    let handleSubmit = (event)=>
        {
            event.preventDefault();
            console.log(formData)
            setFormData({
                username:"",
                remark:"",
                rating:5
            })
        } 
    return(<div>
        <h1>Give a comments</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
        <input style={{fontSize:"1rem"}} 
        placeholder="username" type="text" 
        id="username" value={formData.username} onChange={handleInput}
        name="username"></input>
        <br>
        </br>
        <br/>
<label htmlFor="remark">Remark: </label>
        <textarea style={{fontSize:"1rem"}} value={formData.remark} 
        onChange={handleInput} placeholder="give Remark" 
        id="remark" name="remark"></textarea>
        <br></br>

        <label htmlFor="rating">Rating: </label>
        <input style={{fontSize:"1rem"}} placeholder="rating" id ="rating"
         type="number" min={1} max={10} value={formData.rating}
         name="rating" onChange={handleInput}/>
        <br>
        </br><br/>
        <button>Add Comments</button>
        </form>
    </div>)
}