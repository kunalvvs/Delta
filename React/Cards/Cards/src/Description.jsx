export default function Description({title,des,des1,price}){
    let li= {marginLeft:"10px" ,
       fontSize:"10px", fontWeight:"Bold"
    }
    return <>
     <h4 style={{textAlign: "center",color:"black"}}>{title}</h4>
     
     <div style={{marginTop:"60px"}}>
      <li style={li} >{des}</li>
       <li style={li}>{des1}</li>
       </div>
       
       <div style={{width: "150px", height:"35px",
        backgroundColor:"rgb(235, 209, 121)", marginTop:"30px",
        borderRadius:" 0 0 10px 10px", textAlign:"center",
        alignContent:"center",fontWeight:"bold",color:"black"
       }} > Rs. {price} </div>
       
    </>
}