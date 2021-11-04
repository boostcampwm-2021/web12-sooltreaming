const ENTER_USER = 'welcome';
const JOIN_ROOM = 'joinRoom';
const OFFER = 'offer';
const ANSWER = 'answer';
const ICE = 'ice';

const webRTC =
  (socket) =>
  ({ myPeerConnection, chatRoomCode }) => {
    socket.on(ENTER_USER, async () => {
      console.log('welcome, peer연결');
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      socket.emit(OFFER, offer, chatRoomCode);
    });

    socket.on(OFFER, async (offer) => {
      console.log('offer받음');
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit(ANSWER, answer, chatRoomCode);
    });

    socket.on(ANSWER, (answer) => {
      myPeerConnection.setRemoteDescription(answer);
      console.log('answer받음');
    });

    socket.on(ICE, (ice) => {
      console.log('received candidate');
      myPeerConnection.addIceCandidate(ice);
    });

    const joinRoom = () => {
      socket.emit(JOIN_ROOM, chatRoomCode);
    };

    const sendCandidate = (candidate) => {
      socket.emit(ICE, candidate, chatRoomCode);
    };

    return {
      joinRoom: joinRoom,
      sendCandidate: sendCandidate,
    };
  };

export default webRTC;
