import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Grid, Button, Typography, TextField } from '@mui/material'; 
import Stack from '@mui/material/Stack';
import "../../static/css/room.css";
import VideoList from '../components/VideoList';
import ParticipantList from '../components/ParticipantList';
import LogoutIcon from '@mui/icons-material/Logout';
import MicIcon from '@mui/icons-material/Mic';
import HomeIcon from '@mui/icons-material/Home';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { createOffer, createAnswer, sendSignal } from '../utils/Signal';
import UserContext from "../components/UserContext";





const Room = () => {
    var localStream;
    const mapPeers = {};
    const params = useParams();
    const navigate = useNavigate();
    const video = useRef(null);
    const video2 = useRef(null);
    const [audioState, setAudioState]  = useState("secondary");
    const [videoState, setVideoState]  = useState("secondary");
    const [audioTracks, setAudioTracks]  = useState();
    const [videoTracks, setVideoTracks] = useState();
    const { user, setUser } = useContext(UserContext);
    const [videos, setVideos] = useState([]);
    const [participants, setParticipants] = useState([]);
    const chatSocket = new WebSocket('ws://' + window.location.host +'/ws/room/' + params.roomID + '/' );




    chatSocket.onopen =  (e) => {
        sendSignal('new-peer', {});
    }


    chatSocket.onclose = (e) => {
      console.log('connection closed');
    }

    chatSocket.onerror = (e) => {
      console.log('error occured', e);
    }



    chatSocket.onmessage = (e) =>{

        var parsedData = JSON.parse(event.data);
        var peerUserName = parsedData['peer'];
        var action = parsedData['action'];
        if(userName === peerUserName){
          return;
        }

        var reciever_channel_name = parsedData['message']['reciever_channel_name'];

        if(action === 'new-peer'){
          createOffer(peerUserName, reciever_channel_name);
        }

        if(action === 'new-offer'){
          var offer = parsedData['message']['sdp'];

          createAnswer(offer, peerUserName, reciever_channel_name);
        }

        if(action === 'new-answer'){
          var answer = parsedData['message']['sdp'];

          var peer = mapPeers[peerUserName][0];

          peer.setRemoteDescription(answer);

        }
    }


    useEffect(() =>{

        console.log(user);
        async function init(){
            localStream = await navigator.mediaDevices.getUserMedia({'video': true,'audio': true});
            video.current.srcObject = localStream;

            var tempVideo = localStream.getVideoTracks()
            var tempAudio = localStream.getAudioTracks()
            tempVideo[0].enabled = false;
            tempAudio[0].enabled = false;

            setAudioTracks(tempAudio);
            setVideoTracks(tempVideo);

        }

        init();
    }, []);



    function toggleVideo() {

            videoTracks[0].enabled = !videoTracks[0].enabled;

            if(videoTracks[0].enabled){
              setVideoState("primary");

            }else{
              setVideoState("secondary");
            }


          }


    function toggleAudio() {

            audioTracks[0].enabled = !audioTracks[0].enabled;

            if(audioTracks[0].enabled){
              setAudioState("primary");

            }else{
              setAudioState("secondary");
            }

          }


    function exitRoom(){
      videoTracks.forEach((track) => track.stop());
      audioTracks.forEach((track) => track.stop());
      navigate("/");
    }



    return (

      <div className="grid-container">
        <div className="nav-bar">
          <div className="logout">
              <Button variant="contained" endIcon={<HomeIcon />} onClick={exitRoom} >
                Exit
              </Button>
          </div>
        </div>


        <div className="participants">
            <div className= "participants-header"> Participants</div>
            <ParticipantList participants={participants}/>
        </div>

        <div className="videoArea">
            <video ref={video} className="video" autoPlay playsInline> </video>
            <video ref={video2} className="video" autoPlay playsInline> </video>
        </div>

        <div className="controlToggles">
            <Stack direction="row" spacing={2}>
              <Button size="large" variant="contained" color={videoState} endIcon={<VideocamIcon />} onClick={toggleVideo}>
                Video
              </Button>
              <Button size="large" color={audioState} variant="contained" endIcon={<MicIcon />} onClick={toggleAudio}>
                Audio
              </Button>
            </Stack>
        </div>


      </div>

      );

}



export default Room;






