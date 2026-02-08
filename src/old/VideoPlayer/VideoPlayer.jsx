import React, { useRef } from "react";
import "./VideoPlayer.css";
import video from "../../assets/video.mp4";

const VideoPlayer = ({ playState, setPlayState }) => {
  const player = useRef(null);
  const pause = document.querySelector(".video");

  const hideVideo = (e) => {
    if (e.target === player.current) {
      setPlayState(false);
      pause.pause();
    }
  };

  return (
    <div
      className={`video-player ${playState ? "" : "hide"}`}
      ref={player}
      onClick={hideVideo}
    >
      <video src={video} muted controls className="video"></video>
    </div>
  );
};

export default VideoPlayer;
