const customRTC = () => {
  const initStream = async () => {
    try {
      // 처음 권한 가져오기
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      // 사용중인 트랙은 종료시키자 (권한만이 목적)
      newStream.getTracks().forEach((track) => {
        track.stop();
        newStream.removeTrack(track);
      });
      throw 'Got Permissioned!';
    } catch (e) {
      return true;
    }
  };

  const getVideos = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videos = devices.filter(({ kind }) => kind === 'videoinput');
      return videos;
    } catch (e) {
      return [];
    }
  };

  const getAudios = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audios = devices.filter(({ kind }) => kind === 'audioinput');
      return audios;
    } catch (e) {
      return [];
    }
  };

  const getSpeakers = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const speakers = devices.filter(({ kind }) => kind === 'audiooutput');
      return speakers;
    } catch (e) {
      return [];
    }
  };

  const getVideoTrack = async (deviceId: string) => {
    try {
      if (!deviceId) throw new Error('Get VideoTracks: No Device ID');

      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { deviceId: { exact: deviceId } },
      });
      const tracks = videoStream.getVideoTracks();
      if (!tracks?.length) return null;
      tracks.forEach((t) => (t.enabled = false));

      return tracks[0];
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const getAudioTrack = async (deviceId: string) => {
    try {
      if (!deviceId) throw new Error('Get AudioTracks: No Device ID');

      const audioTrack = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: deviceId } },
        video: false,
      });
      const tracks = audioTrack.getAudioTracks();
      if (!tracks?.length) return null;
      tracks.forEach((t) => (t.enabled = false));

      return tracks[0];
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  const createStream = ({ audioTrack, videoTrack }) => {
    const stream = new MediaStream();
    if (audioTrack) stream.addTrack(audioTrack);
    if (videoTrack) stream.addTrack(videoTrack);
    return stream;
  };

  const createFreshPeer = () => {
    return new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
    });
  };

  const createPeer = async (stream) => {
    const peerConnection = createFreshPeer();
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
    return peerConnection;
  };

  return {
    initStream,
    getVideos,
    getAudios,
    getSpeakers,
    getVideoTrack,
    getAudioTrack,
    createStream,
    createPeer,
  };
};

export default customRTC();
