const ENTER_USER = 'welcome';
const JOIN_ROOM = 'joinRoom';
const OFFER = 'offer';
const ANSWER = 'answer';
const webRTC =
  (socket) =>
  ({ myPeerConnection, roomCode }) => {
    socket.connect();
    socket.on(ENTER_USER, async () => {
      console.log('welcome, peer연결');
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      socket.emit(OFFER, offer, roomCode);
    });

    socket.on(OFFER, async (offer) => {
      console.log('offer받음');
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit(ANSWER, answer, roomCode);
    });

    socket.on(ANSWER, (answer) => {
      console.log(myPeerConnection);
      console.log(answer);
      myPeerConnection.setRemoteDescription(answer);
      console.log('answer받음');
    });

    const joinRoom = (data) => {
      socket.emit(JOIN_ROOM, data);
    };
    return {
      joinRoom: joinRoom,
    };
  };

export default webRTC;
