import { useState, useMemo, useCallback, useEffect } from 'react';
import Socket from '@socket/socket';

export type MarkType = {
  [key: number]: { x: number; y: number };
};

const QUESTION_MARK_TIME = 1900;

const useQuestionMark = () => {
  const [marks, setMarks] = useState<MarkType>({});

  const removeQuestionMark = useCallback((id) => {
    setTimeout(() => {
      setMarks((prev) => {
        const newMarks = { ...prev };
        delete newMarks[id];
        return newMarks;
      });
    }, QUESTION_MARK_TIME);
  }, []);

  const socket = useMemo(() => {
    return Socket.questionmark({ setMarks, removeQuestionMark });
  }, []);
  useEffect(() => {
    return () => {
      socket.disconnecting();
    };
  }, []);
  return { marks, addQuestionMark: socket.addQuestionMark };
};

export default useQuestionMark;
