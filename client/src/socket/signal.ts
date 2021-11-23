import customRTC from '@utils/customRTC';
import {
  SIGNAL_NEED_OFFERS,
  SIGNAL_OFFER,
  SIGNAL_ANSWER,
  SIGNAL_ICE,
} from 'sooltreaming-domain/constant/socketEvent';

const signal =
  (socket) =>
  ({ addStream, stream }) => {
    // 처음 들어왔을 때 받은 유저 정보로
    // 1. peer 생성 후
    // 2. offer 요청
    const peerConnections = {};
    let myStream = stream;

    const sendCandidate = (targetSID) => (e: any) => {
      if (e?.candidate)
        socket.emit(SIGNAL_ICE, {
          candidate: e.candidate,
          receiverSID: targetSID,
          senderSID: socket.id,
        });
    };

    const exitUser = (userRef = myStream) => {
      myStream.getTracks().forEach((track) => {
        track.stop();
        userRef.removeTrack(track);
      });
      Object.values(peerConnections).forEach((peer: any) => {
        peer.removeStream(userRef);
        peer.close();
      });

      socket.disconnect();
    };

    const changeStream = (newStream) => {
      myStream = newStream;
      const videoTrack = myStream.getVideoTracks()[0];
      const audioTrack = myStream.getAudioTracks()[0];
      Object.values(peerConnections).forEach((peer: any) => {
        const senders = peer.getSenders();
        const videoSender = senders.find((sender) => sender.track.kind === 'video');
        if (videoTrack && videoSender) videoSender.replaceTrack(videoTrack);
        const audioSender = senders.find((sender) => sender.track.kind === 'audio');
        if (audioTrack && audioSender) audioSender.replaceTrack(audioTrack);
      });
    };

    socket.on(SIGNAL_NEED_OFFERS, (users) => {
      Object.keys(users).forEach(async (sid) => {
        if (sid === socket.id) return;
        const peer = await customRTC.createPeer(myStream); // TODO : Stream 넣어야 됨
        peer.addEventListener('icecandidate', sendCandidate(sid));
        peer.addEventListener('addstream', (e: any) => {
          addStream(sid, e.stream);
        });
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);

        peerConnections[sid] = peer;
        socket.emit(SIGNAL_OFFER, { offer, receiverSID: sid, senderSID: socket.id });
      });
    });

    // 이후에 접속한 사람의 Offer 받기
    socket.on(SIGNAL_OFFER, async ({ offer, targetSID }) => {
      const peer = await customRTC.createPeer(myStream); // TODO : Stream 넣어야 됨
      peer.addEventListener('icecandidate', sendCandidate(targetSID));
      peer.addEventListener('addstream', (e: any) => {
        addStream(targetSID, e.stream);
      });
      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      peerConnections[targetSID] = peer;
      socket.emit(SIGNAL_ANSWER, { answer, receiverSID: targetSID, senderSID: socket.id });
    });

    // Offer에 대한 답장 받기
    socket.on(SIGNAL_ANSWER, ({ answer, targetSID }) => {
      const peer = peerConnections[targetSID];
      if (!peer) throw new Error('INVALID PEER');
      peer.setRemoteDescription(answer);
    });

    // Candidate 받아서 처리
    socket.on(SIGNAL_ICE, ({ candidate, targetSID }) => {
      if (peerConnections[targetSID]) peerConnections[targetSID].addIceCandidate(candidate);
    });

    const disconnecting = () => {
      socket.off(SIGNAL_ANSWER);
      socket.off(SIGNAL_OFFER);
      socket.off(SIGNAL_ICE);
      exitUser();
    };

    return {
      changeStream,
      disconnecting,
    };
  };

export default signal;
