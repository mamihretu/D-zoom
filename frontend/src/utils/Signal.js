function createOffer(peerUserName, reciever_channel_name) {

    // 48
    var peer = new RTCPeerConnection(null);
    var remoteStream = new MediaStream();
    video2.current.srcObject = remoteStream;
    console.log(remoteStream);

    // 52
    localStream.getTracks().forEach(track => {
        peer.addTrack(track, localStream);
    });

    // 57
    peer.addEventListener('track', async(event) => {
        remoteStream.addTrack(event.track, remoteStream)
    });


    peer.addEventListener('iceconnectionstatechange', () => {
        var iceConnectionState = peer.iceConnectionState;

        if(iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
            delete mapPeers[peerUserName];

            if(iceConnectionState != 'closed'){
                peer.close();
            }

            removeVideo(remoteVideo);
        }
    });

    // 62
    peer.addEventListener('icecandidate', (event) => {
        if(event.candidate){
            console.log('New ice candidate: ', JSON.stringify(peer.localDescription));

            return;
        }

        sendSignal('new-offer', {
            'sdp': peer.localDescription,
            'reciever_channel_name': reciever_channel_name
        });
    });


    // 70
    peer.createOffer()
        .then((offer) => {
            peer.setLocalDescription(offer);
            console.log('local description set successfully', offer);
        });



    // var dc = peer.createDataChannel('channel');
    // dc.addEventListener('open', () => {
    //     console.log('connection opened');
    // });

    // dc.addEventListener('message', dcOnMessage);

    // var remoteVideo = createVideo(peerUserName);
    // remoteVideo.srcObject = remoteStream;




    // mapPeers[peerUserName] = [peer, dc];


}









function createAnswer(offer, peerUserName, reciever_channel_name){
    // 90
    var peer = new RTCPeerConnection(null);
    var remoteStream = new MediaStream();
    video2.current.srcObject = remoteStream;
    console.log(remoteStream);

    // 97
    localStream.getTracks().forEach(track => {
        peer.addTrack(track, localStream);
    });


    // 102
    peer.addEventListener('track', async(event) => {
        remoteStream.addTrack(event.track, remoteStream)
    });


    peer.addEventListener('iceconnectionstatechange', () => {
        var iceConnectionState = peer.iceConnectionState;

        if(iceConnectionState === 'failed' || iceConnectionState === 'disconnected' || iceConnectionState === 'closed'){
            delete mapPeers[peerUserName];

            if(iceConnectionState != 'closed'){
                peer.close();
            }

            removeVideo(remoteVideo);
        }
    });

    // 110
    peer.addEventListener('icecandidate', (event) => {
        if(event.candidate){
            console.log('New ice candidate: ', JSON.stringify(peer.localDescription));

            return;
        }

        sendSignal('new-answer', {
            'sdp': peer.localDescription,
            'reciever_channel_name': reciever_channel_name
        });
    });

    // 119
    peer.setRemoteDescription(offer)
        .then( () => {
            console.log('Remote description set successfully for %s', peerUserName);

            return peer.createAnswer();
      })
        .then(answer => {
            console.log('Answer created');

            peer.setLocalDescription(answer);
        })


    // var remoteVideo = createVideo(peerUserName);

    // remoteVideo.srcObject = remoteStream;


    // peer.addEventListener('datachannel', event => {
        // peer.dc = event.channel;

    //     peer.dc.addEventListener('open', () => {
    //         console.log('Connection opened');
    //     });

    //     peer.dc.addEventListener('message', dcOnMessage);

    //     mapPeers[peerUserName] = [peer, peer.dc];
    // });


}



function sendSignal(action, message ){

  var jsonStr = JSON.stringify({
              'peer': userName,
              'action': action,
              'message': message
          });

  chatSocket.send(jsonStr);
}





export { createOffer, createAnswer, sendSignal }










// let createOffer = async (MemberId) => {

//     // present
//     peerConnection = new RTCPeerConnection(servers)
//     remoteStream = new MediaStream()
//     document.getElementById('user-2').srcObject = remoteStream

//     // present
//     localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream)
//     })

//     // present
//     peerConnection.ontrack = async (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track)
//         })
//     }


//    // present
//     peerConnection.onicecandidate = async (event) => {
//         if(event.candidate){
//             document.getElementById('offer-sdp').value = JSON.stringify(peerConnection.localDescription)
//             client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
//         }
//     }

//     // present
//     let offer = await peerConnection.createOffer()
//     await peerConnection.setLocalDescription(offer)


//     document.getElementById('offer-sdp').value = JSON.stringify(offer)
//     client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId)
// }







// let createAnswer = async (MemberId) => {

//     // present
//     peerConnection = new RTCPeerConnection(servers)
//     remoteStream = new MediaStream()
//     document.getElementById('user-2').srcObject = remoteStream


//     // present
//     localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream)
//     })

//     // present
//     peerConnection.ontrack = async (event) => {
//         event.streams[0].getTracks().forEach((track) => {
//             remoteStream.addTrack(track)
//         })
//     }


//     // present
//     peerConnection.onicecandidate = async (event) => {
//         if(event.candidate){
//             document.getElementById('answer-sdp').value = JSON.stringify(peerConnection.localDescription)
//             client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
//         }
//     }


//     // present
//     let offer = document.getElementById('offer-sdp').value
//     if(!offer) return alert('Retrieve offer from peer first...')
//     offer = JSON.parse(offer)
//     await peerConnection.setRemoteDescription(offer)
//     let answer = await peerConnection.createAnswer()
//     await peerConnection.setLocalDescription(answer)


//     document.getElementById('answer-sdp').value  = JSON.stringify(answer)
//     client.sendMessageToPeer({text:JSON.stringify({'type':'answer', 'answer':answer})}, MemberId)
// }



