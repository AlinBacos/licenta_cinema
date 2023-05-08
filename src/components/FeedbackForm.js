import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./components_style/FeedbackForm.css"

function FeedbackForm() {
  const form = useRef();
 
 const sendEmail = (e) => {
   e.preventDefault(); // prevents the page from reloading when you hit “Send”
 
   emailjs.sendForm('service_u6lnfgo', 'template_zvlql9b', form.current, 'Dl7p4JQNofDkWlhjl')
     .then((result) => {
         // show the user a success message
     }, (error) => {
         // show the user an error
     });
 };
  // const[email,setEmail] = useState("");
  // const[question1,setQuestion1] = useState("");
  // const[question2,setQuestion2] = useState("");
  // const[question3,setQuestion3] = useState("");
  // const[question4,setQuestion4] = useState("");
  // const[question5,setQuestion5] = useState("");
  // const[question6,setQuestion6] = useState("");

  // const handleEmailChange = (e) =>{
  //   setEmail(e.target.value);
  // }
  // const handleQuestion1Change = (e) =>{
  //   setQuestion1(e.target.value);
  // }

  // const handleQuestion2Change = (e) =>{
  //   setQuestion2(e.target.value);
  // }
  // const handleQuestion3Change = (e) =>{
  //   setQuestion3(e.target.value);
  // }

  // const handleQuestion4Change = (e) =>{
  //   setQuestion4(e.target.value);
  // }

  // const handleQuestion5Change = (e) =>{
  //   setQuestion5(e.target.value);
  // }
  // const handleQuestion6Change = (e) =>{
  //   setQuestion6(e.target.value);
  // }
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [message, setMessage] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios.post('/email.php', { name, email, message })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
  //     <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
  //     <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
  //     <button type="submit" onClick={handleSubmit}>Submit</button>
  //   </form>
  // );
  return (
    <div className="feedback-div">
    <div className="feedback-form">
        <form ref={form} onSubmit={sendEmail}>
            <label>Email</label><br/>
            <input type="email" name="user_email" placeholder="Enter your email"></input><br/>
            <label>Did the movies watched meet your expectations?</label><br/>
            <input type="text" name="user_name"></input><br/>
            <label>How did you feel about the sound quality in the theater?</label><br/>
            <input type="text" name="message"></input><br/>
            {/* <label>How would you rate the comfort of the seating?</label><br/>
            <input type="text" onChange= {handleQuestion3Change}></input><br/>
            <label>Were there any technical issues during the movie</label><br/>
            <input type="text" onChange= {handleQuestion4Change}></input><br/>
            <label>How would you rate your overall experience at the movie theater?</label><br/>
            <input type="text" onChange= {handleQuestion5Change}></input><br/>
            <label>Would you attend another movie at this theater in the future?</label><br/>
            <input type="text" onChange= {handleQuestion6Change}></input><br/> */}
            <input type="submit" value="Send" />
            {/* <button>Submit Feedback</button><br/> */}
        </form>
    </div>
    </div>
  )
}

export default FeedbackForm