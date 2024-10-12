
function Events()
{
    console.log("Para executed");
    return <>
    
    <div onMouseOver={Buttons}> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Necessitatibus amet soluta perspiciatis illum corporis 
        assumenda minima quia labore nobis perferendis aliquam doloremque, 
        fuga nisi hic. Officiis quia reiciendis totam accusamus?</div>

    </>
}

export default function Buttons()

{
    console.log("Execuete");
    return <>
     
     <button onClick={Events} > Click for changes </button>
     <button onDoubleClick={Events} > Double Click</button>
     <Events/>
    </>
}




