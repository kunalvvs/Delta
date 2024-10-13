import { useState } from "react"


export default function LikeButton()
{
    let [isliked,setisliked]=useState(false);
   
    let  toggle = () => { setisliked(!isliked )};

    return (
    <>
   <p onClick={toggle}> {isliked ? 
    (<i className="fa-regular fa-heart "  ></i>) :
    ( <i class="fa-solid fa-heart"></i>)}</p>
       
    </>
    )
}