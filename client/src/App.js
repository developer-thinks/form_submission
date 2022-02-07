import { useState } from 'react';
import './App.css';
import Axios from 'axios'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
// const {db} = require('./localDb')

function App() {

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [localdb, setLocalDb] = useState(false);
  const [database, setDatabase] = useState(false);

  const options = [
    "localdb",
    "database"
  ]
  const defaultOption = options[0];

  const handleFormSubmission = (e)=>{
    e.preventDefault()
    const userDetails ={
      firstname, lastname, email, phone, zipcode
    }
    if(database){
      Axios.post('http://localhost:5000/savetodb', {...userDetails, database}).then(res=>{
      console.log(res);
      setDatabase(false)
    })
    } else if(localdb){
      Axios.post('http://localhost:5000/savetolocaldb', {...userDetails, localdb}).then(res=>{
      console.log(res);
      setLocalDb(false)
    })
    } else{
      console.log("please choose db");
    }
    
  }

  const handleStorage = async (e) =>{
    // console.log(e.value);
    if(e.value == "localdb"){
      // console.log(localdb);
      await setLocalDb(true)
      // console.log(localdb);
    }else{
      await setDatabase(true)
    }
  }

  const checkLocalStorage = ()=>{
    // console.log(db);
  }

  return (

    <div className="app">
      <h2> Contact Form</h2>
      <div className='container'>
        <div className="user_details">
        <label>firstName :</label>
        <input
          className="input_label" 
          type = "text" 
          value={firstname} 
          onChange={(e)=>setFirstName(e.target.value)}  
          placeholder="Enter firstName" 
        />
        </div>
        <div className="user_details">
        <label>lastName :</label>
        <input
          className="input_label" 
          type = "text" 
          value={lastname} 
          onChange={(e)=>setLastName(e.target.value)} 
          placeholder="Enter lastName" 
        />
        </div>

        <div className="user_details">
        <label>Email :</label>
        <input
          className="input_label" 
          type = "email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          placeholder="Enter Email" 
        />
        </div>
       

        <div className="user_details">
        <label> Phone :</label>
        <input
          className="input_label" 
          type = "number" 
          value={phone} 
          onChange={(e)=>setPhone(e.target.value)}  
          placeholder="Enter mobile No" 
        />
        </div>
        

        <div className="user_details">
        <label>Zip code :</label>
        <input
          className="input_label" 
          type = "number" 
          value={zipcode} 
          onChange={(e)=>setZipcode(e.target.value)} 
          placeholder="Enter zip code" 
        />
        </div>
        </div>
        <Dropdown options={options} onChange={handleStorage}  value={defaultOption} placeholder="Select an option" />

        <button className='button' onClick={handleFormSubmission}> Submit</button>

      <button className='button' onClick={checkLocalStorage}> check local Db</button>
    </div> 

    
  );
}

export default App;
