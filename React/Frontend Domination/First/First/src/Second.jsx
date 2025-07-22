import { useState } from "react"

export default function Second(){
    const [firstImg, setFirstImg] = useState("https://cdn.pixabay.com/photo/2024/05/15/20/57/developer-8764524_1280.jpg");
    const [secondImg, setSecondImg] = useState("https://tse3.mm.bing.net/th/id/OIP.Ag-nwzIPW2WDlBKp70VBhQHaEp?w=1280&h=804&rs=1&pid=ImgDetMain&o=7&rm=3");

    const handlePos = () => {
        // Swap the image sources using React state
        
        setFirstImg(secondImg);
        setSecondImg(firstImg);
    }

    return (
        <div>
            <h4>2. Create a page with two images and a button. When the button is clicked, swap the source attribute of the images.</h4>
            <img className="f" src={firstImg} alt="First Image"/>
            <img className="s" src={secondImg} alt="Second Image"/>
            <br /> 
            <button onClick={handlePos}>Swap Image</button>
        </div>
    )
}