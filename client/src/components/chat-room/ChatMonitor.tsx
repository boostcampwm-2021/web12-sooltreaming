import React, { useEffect, useRef } from 'react';
import Socket from '@socket/socket';

const ChatMonitor: React.FC = () => {
  const roomCode = '123'; //임시
  useEffect(() => {
    const socket = Socket;
    peerConnection().then(() => {
      socket.webRTC({ myPeerConnection, roomCode }).joinRoom(roomCode);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  let myStream;
  let isMute = false;
  let isCameraOff = false;
  let myPeerConnection;
  const myFaceRef = useRef<HTMLVideoElement>(null);
  const muteButtonRef = useRef<HTMLButtonElement>(null);
  const cameraOffButtonRef = useRef<HTMLButtonElement>(null);

  const getMedia: any = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      if (!myFaceRef.current) return;
      myFaceRef.current.srcObject = myStream ? myStream : null;
    } catch (e) {
      console.log(e);
    }
  };

  const peerConnection = async () => {
    await getMedia();
    myPeerConnection = new RTCPeerConnection();
    myStream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, myStream);
    });
  };

  const handelMute = () => {
    if (muteButtonRef && muteButtonRef.current)
      muteButtonRef.current.innerText = isMute ? '음소거' : '음소거 해제';
    isMute = !isMute;
    console.log(myStream, 'handleMute');
    myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  };
  const handleCamera = () => {
    if (cameraOffButtonRef && cameraOffButtonRef.current)
      cameraOffButtonRef.current.innerText = isCameraOff ? '영상 켜기' : '영상 끄기';
    isCameraOff = !isCameraOff;
    myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  };

  return (
    <>
      <video className="myFace" ref={myFaceRef} autoPlay></video>
      <button ref={muteButtonRef} onClick={handelMute}>
        음소거
      </button>
      <button ref={cameraOffButtonRef} onClick={handleCamera}>
        영상 끄기
      </button>
    </>
  );
};

export default ChatMonitor;
