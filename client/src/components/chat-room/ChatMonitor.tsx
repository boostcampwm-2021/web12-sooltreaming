import React, { useEffect, useRef, useCallback } from 'react';
import Socket from '@socket/socket';

type ChatFormPropTypes = {
  chatRoomCode: String;
};

const ChatMonitor: React.FC<ChatFormPropTypes> = ({ chatRoomCode }) => {
  useEffect(() => {
    const initPeer = async () => {
      await peerConnection();
      const socket = Socket.webRTC({ myPeerConnection, chatRoomCode }).joinRoom();
      return socket;
    };
    let socket: any;
    initPeer().then((sock) => {
      socket = sock;
    });

    return () => {
      socket?.disconnecting();
    };
  }, []);

  let myStream;
  let isMute = false;
  let isCameraOff = false;
  let myPeerConnection;
  const myFaceRef = useRef<HTMLVideoElement>(null);
  const peerFaceRef = useRef<HTMLVideoElement>(null);
  const muteButtonRef = useRef<HTMLButtonElement>(null);
  const cameraOffButtonRef = useRef<HTMLButtonElement>(null);

  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
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
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
            'stun:stun3.l.google.com:19302',
            'stun:stun4.l.google.com:19302',
          ],
        },
      ],
    });
    myStream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, myStream);
    });
    myPeerConnection.addEventListener('icecandidate', handleCandidate);
    myPeerConnection.addEventListener('addstream', handleAddStream);
  };

  const handleMute = useCallback(() => {
    if (muteButtonRef && muteButtonRef.current)
      muteButtonRef.current.innerText = isMute ? '음소거' : '음소거 해제';
    isMute = !isMute;
    if (myStream) myStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [myStream]);

  const handleCamera = useCallback(() => {
    if (cameraOffButtonRef && cameraOffButtonRef.current)
      cameraOffButtonRef.current.innerText = isCameraOff ? '영상 켜기' : '영상 끄기';
    isCameraOff = !isCameraOff;
    if (myStream) myStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
  }, [myStream]);

  const handleCandidate = (e: any) => {
    Socket.webRTC({ myPeerConnection, chatRoomCode }).sendCandidate(e.candidate);
  };

  const handleAddStream = (e: any) => {
    if (peerFaceRef && peerFaceRef.current) peerFaceRef.current.srcObject = e.stream;
  };
  return (
    <>
      <video
        className="myFace"
        ref={myFaceRef}
        width="400"
        height="400"
        autoPlay
        playsInline
      ></video>
      <button ref={muteButtonRef} onClick={handleMute}>
        음소거
      </button>
      <button ref={cameraOffButtonRef} onClick={handleCamera}>
        영상 끄기
      </button>
      <select className="camera">
        <option value="device">카메라명</option>
      </select>
      <video
        className="peerFace"
        ref={peerFaceRef}
        width="400"
        height="400"
        autoPlay
        playsInline
      ></video>
    </>
  );
};

export default ChatMonitor;
