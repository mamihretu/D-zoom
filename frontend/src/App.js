import React, { useState, useMemo } from "react";
import JoinPage from './pages/JoinPage';
import RoomPage from './pages/RoomPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserContext from './components/UserContext';
import { 
  BrowserRouter as Router, 
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate 
} from 'react-router-dom';




const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return(  
		<Router>
        <UserContext.Provider value={value}>
				    <Routes>
				        <Route path = '/'>
				            <Route index element = {<JoinPage/>}/>
				            <Route path = 'room/:roomID' element = {<RoomPage/>}/>
				            <Route path = 'rest-auth/login' element = {<LoginPage/>}/>
				            <Route path = 'rest-auth/registration' element = {<SignUpPage/>}/>
				        </Route>
				    </Routes>
        </UserContext.Provider>
		</Router>
	);

}

export default App;
