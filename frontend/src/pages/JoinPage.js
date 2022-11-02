import React, {useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../../static/css/index.css"; 
import getCookie from '../utils/Csrf';
import UserContext from "../components/UserContext";



const JoinPage = () => {
        const { user, setUser } = useContext(UserContext);
        const navigate = useNavigate();
        const [page, setPage] = useState({
        roomID :"",
        error : false
        });


        useEffect(()=>{
        console.log(user);
        if(!user){
            navigate("/rest-auth/login");
        }
        })


        function loadRoomIDFromInput(e){
        setPage((previousState) => {
              return {...previousState, roomID: e.target.value}
        } );
        }


        function loadUserNameFromInput(e){
        setPage(e.target.value);

        }

        function joinRoom(){
        if(user){
            navigate(`/room/${page.roomID}`);
        }

        }

        function logout() {
            var csrftoken = getCookie('csrftoken');
            const requestOptions = {
                method: 'POST',
                mode: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                  }
            }
            fetch('/rest-auth/logout/', requestOptions)
            .then(response => {
                if(response.ok){
                    setUser(null);
                    navigate('/rest-auth/login/');
                }});
        }


        return(
        <div className = "center">
            <Grid container spacing={1} align="center">
                <Grid item xs = {12}>
                    <Typography component="h4" variant="h4">
                          Join a Room
                    </Typography> 
                </Grid>               
                <Grid item xs={12} align="center">
                    <TextField 
                      error={page.error}
                      label="Code"
                      value={page.roomID}
                      helperText={page.error}
                      variant="outlined"
                      onChange = {loadRoomIDFromInput}
                      />
                </Grid> 

                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={joinRoom} >
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={logout} >
                        Logout
                    </Button>
                </Grid>            
            </Grid>
        </div>
        )
}

export default JoinPage;
