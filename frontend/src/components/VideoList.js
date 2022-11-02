import React, { useState} from 'react';


const VideoList = (props) => {
    const videoArray = props.participants;
    const uniqueVideos = [...new Set(videoArray)]


    if(uniqueVideos.length <= 0){
        return <h1>No Videos yet </h1>;

    }else{
        return (

                <div key={id} className="videos">
                      {uniqueVideos.map((video, id) => (
                            <video ref={video} className="video" autoPlay playsInline> </video>

                      ))}
                </div>

            );
    }
}


export default VideoList;








