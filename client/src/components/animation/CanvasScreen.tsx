import React, { useState, useRef, useEffect } from 'react';
import { FullScreen } from './CanvasScreen.style';

const CanvasScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);

  const handleResize = () => {
    console.log(`화면 사이즈 ${window.innerWidth}, ${window.innerHeight}`);
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FullScreen>
      <canvas className="fullScreen" ref={canvasRef} height={canvasHeight} width={canvasWidth} />
    </FullScreen>
  );
};

export default CanvasScreen;
