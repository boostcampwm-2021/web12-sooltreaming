import React, { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store';
import { requestInitInfo } from '@store/device';
import { setRoomCode } from '@store/room';
import Setting from '@src/components/setting';
import Loading from '@components/custom/Loading';
const Room = lazy(() => import('@components/room/'));

const JoinRoom: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch();
  const stream = useSelector((state: RootState) => state.device.stream);
  const isLoading = useSelector((state: RootState) => state.device.isLoading);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const { code } = useParams();

  useEffect(() => {
    dispatch(requestInitInfo({}));
    dispatch(setRoomCode(code));
  }, []);

  useEffect(() => {
    return () => {
      stream?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [stream]);

  const renderRoom = () => {
    setIsFirst(false);
  };

  if (isLoading) return <Loading />;
  if (isFirst) return <Setting renderRoom={renderRoom} />;
  return <Room />;
};

export default JoinRoom;
