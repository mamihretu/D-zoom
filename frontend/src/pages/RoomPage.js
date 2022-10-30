import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material'; 
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import "../../static/css/room.css";
import MessageList from '../components/MessageList';
import ParticipantList from '../components/ParticipantList';
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import logout from '../utils/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Fab from '@mui/material/Fab';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';





const Room = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const chatSocket = new WebSocket('ws://' + 
                                    window.location.host + 
                                    '/ws/room/' + 
                                    params.roomID + '/'
                                    );  

  chatSocket.onmessage = (e) =>{
    const data = JSON.parse(e.data);
    const receivedMessage = data; 
    setMessages(messages => [...messages, receivedMessage]);
}


  
  useEffect(() => {

   fetch('/chat/setup1')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setUserName(data.username);
    });


    fetch('/chat/setup2')
    .then(response => response.json())
    .then(data => {
      setParticipants(participants => [...participants, ...data[0].participants]);
      setMessages(messages => [...messages, ...data[0].messages]);
    });
    
  }, [])


  function loadMessageFromInput(e){
    setMessage(e.target.value);

  }  


  function sendMessage() {
    chatSocket.send(JSON.stringify({
                    'message': message,
                    'username': username,
                }));
  }


  function leaveRoom() {
    const requestOptions = {
      method : 'post',
      headers : {'contentType': 'application/json'},

    };

    fetch('/api/leave-room', requestOptions)
    .then(response => navigate('/'));
  } 

  return(

    <div className="grid-container">
      <div className="nav-bar">
        <div className="setting"> 
            <Button variant="contained" endIcon={<LogoutIcon />} onClick={logout} >
              Logout
            </Button>           
        </div>
      </div> 


      <div className="participants">
          <div className= "participants-header"> Participants</div>
          <ParticipantList participants={participants}/>
      </div>

      <div className="video-display">
          <div className="video-container">
            <div className="video1" >
            <video className = "video" autoplay playsinline> </video>
            </div>
          <div className="video2">
          </div>
        </div>
      </div>

      <div className="incoming-message-area">

            {messages.length > 0 ? (<MessageList messages={messages} type="incoming" username={username} />):
                                   (<h2 style={{textAlign:'center'}}>No messages yet</h2>) }
      </div>

      <div className="message-input">
          <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" endIcon={<VideocamIcon />} onClick={sendMessage}>
              Video
            </Button>
            <Button size="large" variant="contained" endIcon={<MicOffIcon />} onClick={sendMessage}>
              Mute
            </Button>
          </Stack>
      </div>



    </div>

    );

}

export default Room;






