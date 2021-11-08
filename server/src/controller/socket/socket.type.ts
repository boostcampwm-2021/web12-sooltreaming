type roomType = {
  [code: string]: {
    hostID: string;
    isOpen: boolean;
    users: {
      [sid: string]: {
        uid: string;
        nickname: string;
        imgURL: string;
        videoID: string;
        audioID: string;
      };
    };
  };
};
