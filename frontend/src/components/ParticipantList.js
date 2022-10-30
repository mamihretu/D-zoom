import React, { useState} from 'react';
import "../../static/css/room.css";



const ParticipantList = (props) => {
	const participantsArray = props.participants;
	const uniqueParticipants = [...new Set(participantsArray)]
	const reducedArray = uniqueParticipants.length > 10 ? uniqueParticipants.slice(-10) : uniqueParticipants; 

	if(uniqueParticipants.length <= 0){
		return <h1>No participants yet</h1>;

	}else{
		return (
				<>
			      {uniqueParticipants.map((participant, id) => (
			        <div key={id} className="person"> {participant} </div> 
			      ))}
				</>			
			);
	}
}


export default ParticipantList;