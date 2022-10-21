


var labelUsername = document.querySelector('#label-username');
var UsernameInput = document.querySelector('#username');
var btnJoin = document.querySelector('#btn-join');
var userName;
var webSocket;
var mapPeers = {};


function webSocketOnMessage(event) {
	var parseData = JSON.parse(event.data);
	var peerUserName = parseData['peer'];
	var action = parseData['action'];
	if(userName === peerUserName){
		return;
	}

	var reciever_channel_name = parseData['message']['reciever_channel_name'];

	if(action === 'new-peer'){
		createOffer(peerUserName, reciever_channel_name);
		return;

	}


	if(action === 'new-offer'){
		var offer = parseData['message']['sdp'];

		createAnswer(offer, peerUserName, reciever_channel_name);

		return;
	}

	if(action === 'new-answer'){
		var answer = parseData['message']['sdp'];

		var peer = mapPeers[peerUserName][0];

		peer.setRemoteDescription(answer);

		return;
	}
}

btnJoin.addEventListener('click', () => {
	userName = UsernameInput.value;

	if (userName) {
		UsernameInput.value = '';
		UsernameInput.disabled = true;
		UsernameInput.style.visibility = 'hidden';

		btnJoin.disabled = true;
		btnJoin.style.visibility = 'hidden';	

		var labelUsername = document.querySelector('#label-username');
		labelUsername.innerHTML = userName;	

		var loc = window.location;
		var protocol = 'ws://';

		if(loc.protocol === 'https:'){
			protocol = 'wss://';
		}

		var endPoint = protocol + loc.host + loc.pathname;

		webSocket = new WebSocket(endPoint);

		webSocket.addEventListener('open', (e) => {
			console.log('connection opened');

			sendSignal('new-peer', {});
		});
		webSocket.addEventListener('message', webSocketOnMessage);
		webSocket.addEventListener('close',(e) => {
			console.log('connection closed');
		});
		webSocket.addEventListener('error',(e) => {
			console.log('error occured');
		});

	}
	else{
		return;
	}
});


var localStream = new MediaStream();

const constraints = {
	'video': true,
	'audio': true
};

const localVideo = document.querySelector('#local-video');

const btnToggleAudio = document.querySelector('#audio-toggle');

const btnTogglevideo = document.querySelector('#video-toggle');


var userMedia = navigator.mediaDevices.getUserMedia(constraints)
				.then( stream => {
						localStream = stream;
						localVideo.srcObject = localStream;
						localVideo.muted = true;

						var audioTracks = stream.getAudioTracks();
						var videoTracks = stream.getVideoTracks();

						audioTracks[0].enabled = true;
						videoTracks[0].enabled = true;

						btnToggleAudio.addEventListener('click', ()=> {
							audioTracks[0].enabled = !audioTracks[0].enabled;

							if(audioTracks[0].enabled){
								btnToggleAudio.innerHTML = 'Mute';

								return;
							}
							btnToggleAudio.innerHTML = 'Unmute';

						});


						btnToggleVideo.addEventListener('click', () => {
							videoTracks[0].enabled = !videoTracks[0].enabled;

							if(videoTracks[0].enabled){
								btnToggleVideo.innerHTML = 'Video off';

								return;
							}
							btnToggleVideo.innerHTML = 'Video ON';

						});

						})
				.catch(error => {
						console.log('error accesing media devices', error);
						 });


var btnSendMsg = document.querySelector('#btn-send-message');
var messageInput = document.querySelector('#msg');
var messageList = document.querySelector('#message-list');

btnSendMsg.addEventListener('click', sendMsgOnClick);



function sendMsgOnClick(){
	var message = messageInput.value;
	console.log(message);

	var li = document.createElement('li');
	li.appendChild(document.createTextNode('Me:' + message));
	messageList.appendChild(li);

	var dataChannels = getDataChannels();

	message = username + ':' + message;

	for(index in dataChannels){
		dataChannels[index].send(message);
	}
	messageInput.value = '';
}


function getDataChannels(){
	var dataChannels = [];

	for(peerUserName in mapPeers){
		var dataChannel = mapPeers[peerUserName][1];

		dataChannels.push(dataChannel);
	}
	return dataChannels;
}



function sendSignal(action, message){

	var jsonStr = JSON.stringify({
				'peer': userName,
				'action': action,
				'message': message
			});	

	webSocket.send(jsonStr);

}


function createOffer(peerUserName, reciever_channel_name) {
	var peer = new RTCPeerConnection(null);

	addLocalTracks(peer);

	var dc = peer.createDataChannel('channel');
	dc.addEventListener('open', () => {
		console.log('connection opened');
	});

	dc.addEventListener('message', dcOnMessage);

	var remoteVideo = createVideo(peerUserName);

	setOnTreack(track, remoteVideo);

	mapPeers[peerUserName] = [peer, dc];

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


	peer.createOffer()
		.then(response => peer.setLocalDescription(response))
		.then(() => {
			console.log('local description set successfully');
		});

}


function createAnswer(offer, peerUserName, reciever_channel_name){

	var peer = new RTCPeerConnection(null);

	addLocalTracks(peer);

	var remoteVideo = createVideo(peerUserName);

	setOnTreack(track, remoteVideo);

	peer.addEventListener('datachannel', event => {
		peer.dc = event.channel;

		peer.dc.addEventListener('open', () => {
			console.log('Connection opened');
		});

		peer.dc.addEventListener('message', dcOnMessage);

		mapPeers[peerUserName] = [peer, peer.dc];
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


	peer.setRemoteDescription(offer)
		.then( () => {
			console.log('Remote description set successfully for %s', peerUserName);

			return peer.createAnswer();
	  })
		.then(answer => {
			console.log('Answer created');

			peer.setLocalDescription(answer);
		})



}

function removeVideo(video){
	var videoWrapper = video.parentNode;

	videoWrapper.parentNode.removeChild(videoWrapper);
}




function createVideo(peerUserName){
	var videoContainer = document.querySelector('#video-container');

	var remoteVideo = document.createElement('video');

	remoteVideo.id = peerUserName + '-video';

	remoteVideo.autoplay = true;
	remoteVideo.playsinline = true;

	var videoWrapper = document.createElement('div');

	videoContainer.appendChild(videoWrapper);

	videoWrapper.appendChild(remoteVideo);

	retrun remoteVideo;

}

function setOnTrack(peer, remoteVideo){
	var remoteStream = new MediaStream();
	remoteVideo.srcObject = remoteStream;
	peer.addEventListener('track', async(event) => {
		remoteStream.addTrack(event.track, remoteStream)
	});
}





function dcOnMessage(event){
	var message = event.data;

	var li = document.createElement('li');
	li.appendChild(document.createTextNode(message));

	messageList.appendChild(li);

}

function addLocalTracks(peer) {
	localStream.getTracks().forEach(track => {
		peer.addTrack(track, localStream);
	});

	return;
}





