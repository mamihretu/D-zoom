import React, {useState, useEffect} from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../../static/css/index.css"; 
import getCookie from '../utils/Csrf';
import logout from '../utils/Logout';



const JoinPage = () => {
      const [user, setUser] = useState("");
      const navigate = useNavigate();    
      const [page, setPage] = useState({
        roomID :"",
        error : false
      });


      function loadRoomIDFromInput(e){
        setPage((previousState) => {
              return {...previousState, roomID: e.target.value}
        } );
      }


      function loadUserNameFromInput(e){
        setPage(e.target.value);

      } 

      function joinRoom(){
        navigate(`/room/${page.roomID}`);
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
