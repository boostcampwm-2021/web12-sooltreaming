import React, { useState, useRef, useEffect } from 'react';
import { FullScreen } from './CheersCanvas.style';

const CheersCanvas = ({ isCheers, setIsCheers }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const CheersAnimationNum = 2;

  // resize시 canvas의 크기 상태를 변경하는 부분
  const handleResize = () => {
    console.log(`화면 사이즈 ${window.innerWidth}, ${window.innerHeight}`);
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  };

  const randomSelect = () => {
    const randomNum = Math.floor(Math.random() * CheersAnimationNum) + 1;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (isCheers) {
      const animation = new Image();
      animation.src = `/images/logo.png`;
      ctx?.drawImage(animation, 0, 0, 1000, 1000);
      console.log(animation.src);
      console.log(canvas);
      console.log(ctx);
    }
    setTimeout(() => {
      if (canvas) ctx?.clearRect(0, 0, canvas.width, canvas.height);
      setIsCheers(false);
    }, 5000);
  };

  // resize 처리
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // cheers 명령이 들어왔을 때의 처리
  useEffect(() => {
    if (isCheers) {
      randomSelect();
    }
  }, [isCheers]);

  return (
    <FullScreen>
      <canvas className="fullScreen" ref={canvasRef} height={canvasHeight} width={canvasWidth} />
    </FullScreen>
  );
};

export default CheersCanvas;
