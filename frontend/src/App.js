import React, { useState, useEffect } from "react";
import JoinPage from './pages/JoinPage';
import RoomPage from './pages/RoomPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { 
  BrowserRouter as Router, 
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate 
} from 'react-router-dom';




const App = () => {

	return(  
		<Router>
		    <Routes>
		        <Route path = '/'>
		            <Route index element = {<JoinPage/>}/>
		            <Route path = 'room/:roomID' element = {<RoomPage/>}/>
		            <Route path = 'rest-auth/login' element = {<LoginPage/>}/>
		            <Route path = 'rest-auth/registration' element = {<SignUpPage/>}/>
		        </Route>
		    </Routes>    
		</Router>
	);

}

export default App;
