function Message (text)
{
    return <h3>Execute</h3>
}
// This is example of Switch case 

function NotificationMsg({ text}) {  
    switch(text) {  
      case 'Hi All':  
        return <Message text={text} />;  
      case 'Hello JavaTpoint':  
        return <Message text={text} />;  
      default:  
        return null;  
    }  
  }  

  export default NotificationMsg