import React from 'react';
import Form from './component/form/form';
import Navcomponent from './component/navbar/navbar';
import Listing from './component/listings/listing';
//import Displayitem from './component/displayitems/displayitems';
import Loginform from './component/loginform/loginform';
//import Manipulate from './component/articlemanipulation/articlemanipulation';
//import Contactus from './component/contactus/contactus';
//import Aboutus from './component/about/about';
//import Add from './component/adding/adding'
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

const App=()=>{
    return(
        <Router>
            <Route path="/" exact  component={props=><div className="appcss"><Navcomponent/>
                    <div className="formcss"><Form /></div></div>}/>
            <Route path="/listing" component={props=><div><Navcomponent/><Listing/></div>} />  
            <Route path="/login" component={props=><div className="appcss"><Navcomponent/>
                    <div className="loginformcss"><Loginform /></div></div>}/>     
        </Router>

    );
}
export default App;