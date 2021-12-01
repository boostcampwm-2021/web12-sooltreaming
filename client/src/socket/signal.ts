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
    const peerConnections = {};
    let myStream = stream;

    const sendCandidate = (targetSID) => (e: any) => {
      if (e?.candidate) {
        socket.emit(SIGNAL_ICE, {
          candidate: e.candidate,
          receiverSID: targetSID,
          senderSID: socket.id,
        });
      }
    };

    const exitUser = (userRef = myStream) => {
      myStream.getTracks().forEach((track) => {
        track.stop();
        userRef.removeTrack(track);
      });
      Object.entries(peerConnections).forEach(([key, peer]: any) => {
        peer.removeStream(userRef);
        peer.close();
        delete peerConnections[key];
      });

      socket.disconnect();
    };

    const disconnectedPeer = (sid) => (e) => {
      const state = e.target?.connectionState;
      console.log(state);
      if (state !== 'disconnected') return;
      peerConnections[sid].close();
      delete peerConnections[sid];
    };

    const redirectPeer =
      ({ sid, peer }) =>
      (e) => {
        const state = e.target?.connectionState;
        if (state !== 'failed') return;
        peer.close();
        delete peerConnections[sid];
        sendOffer(sid);
      };

    // 유저에게 Offer 보내기
    const sendOffer = async (sid) => {
      if (sid === socket.id) return;

      const peer = await customRTC.createPeer(myStream);
      peer.addEventListener('icecandidate', sendCandidate(sid));
      peer.addEventListener('addstream', addStream(sid));
      peer.addEventListener('connectionstatechange', redirectPeer({ sid, peer }));
      peer.addEventListener('connectionstatechange', disconnectedPeer(sid));
      peerConnections[sid] = peer;

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      socket.emit(SIGNAL_OFFER, { offer, receiverSID: sid, senderSID: socket.id });
    };
    // 첫 모든 유저에게 Offer 보내기
    socket.on(SIGNAL_NEED_OFFERS, (users) => {
      Object.keys(users).forEach(sendOffer);
    });

    // 이후에 접속한 사람의 Offer 받기
    socket.on(SIGNAL_OFFER, async ({ offer, targetSID }) => {
      const peer = await customRTC.createPeer(myStream); // TODO : Stream 넣어야 됨
      peer.addEventListener('icecandidate', sendCandidate(targetSID));
      peer.addEventListener('addstream', addStream(targetSID));
      peer.addEventListener('connectionstatechange', disconnectedPeer(targetSID));
      peerConnections[targetSID] = peer;

      await peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      socket.emit(SIGNAL_ANSWER, { answer, receiverSID: targetSID, senderSID: socket.id });
    });

    // Offer에 대한 답장 받기
    socket.on(SIGNAL_ANSWER, ({ answer, targetSID }) => {
      const peer = peerConnections[targetSID];
      if (!peer) return;
      peer.setRemoteDescription(answer);
    });

    // Candidate 받아서 처리
    socket.on(SIGNAL_ICE, ({ candidate, targetSID }) => {
      if (!peerConnections[targetSID]) return;
      peerConnections[targetSID].addIceCandidate(candidate);
    });

    // 밖에서 사용할 함수들
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
