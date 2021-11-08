import customRTC from '@utils/customRTC';

const NEED_OFFERS = 'need offers';
const OFFER = 'offer';
const ANSWER = 'answer';
const ICE = 'ice';

const webRTC =
  (socket) =>
  ({ setStreams, myStream }) => {
    // 처음 들어왔을 때 받은 유저 정보로
    // 1. peer 생성 후
    // 2. offer 요청
    const peerConnections = {};

    const sendCandidate = (targetSID) => (e: any) => {
      socket.emit(ICE, { candidate: e.candidate, receiverSID: targetSID, senderSID: socket.id });
    };

    socket.on(NEED_OFFERS, (users) => {
      Object.keys(users).forEach(async (sid) => {
        if (sid === socket.id) return;
        const peer = await customRTC.createPeer(myStream); // TODO : Stream 넣어야 됨
        peer.addEventListener('icecandidate', sendCandidate(sid));
        peer.addEventListener('addstream', (e: any) => {
          setStreams((prev) => ({ ...prev, [sid]: e.stream }));
        });
        const offer = await peer.createOffer();
        peer.setLocalDescription(offer);

        peerConnections[sid] = peer;
        socket.emit(OFFER, { offer, receiverSID: sid, senderSID: socket.id });
      }, {});
    });

    // 이후에 접속한 사람의 Offer 받기
    socket.on(OFFER, async ({ offer, targetSID }) => {
      const peer = await customRTC.createPeer(myStream); // TODO : Stream 넣어야 됨
      peer.addEventListener('icecandidate', sendCandidate(targetSID));
      peer.addEventListener('addstream', (e: any) => {
        setStreams((prev) => ({ ...prev, [targetSID]: e.stream }));
      });
      peer.setRemoteDescription(offer);
      const answer = await peer.createAnswer();
      peer.setLocalDescription(answer);

      peerConnections[targetSID] = peer;
      socket.emit(ANSWER, { answer, receiverSID: targetSID, senderSID: socket.id });
    });

    // Offer에 대한 답장 받기
    socket.on(ANSWER, ({ answer, targetSID }) => {
      const peer = peerConnections[targetSID];
      if (!peer) throw new Error('INVALID PEER');
      peer.setRemoteDescription(answer);
    });

    // Candidate 받아서 처리
    socket.on(ICE, ({ candidate, targetSID }) => {
      peerConnections[targetSID].addIceCandidate(candidate);
    });

    const disconnecting = () => {
      socket.off(ANSWER);
      socket.off(OFFER);
      socket.off(ICE);
    };

    return {
      disconnecting,
    };
  };

export default webRTC;
