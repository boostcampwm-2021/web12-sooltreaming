import { useEffect } from 'react';

const useUpdateStream = (elementRef, srcObject, callback = () => {}) => {
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.srcObject = srcObject ?? null;
    callback();
  }, [srcObject]);
};

export default useUpdateStream;
