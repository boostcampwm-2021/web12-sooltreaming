import React, { useState, useRef, useEffect } from 'react';
import { FullScreen } from './CheersCanvas.style';
import { GIF } from './GIF';

const CheersCanvas = ({ isCheers, setIsCheers }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');

  const CheersGifNum = 2; // GIF 애니메이션의 수

  let myGif: any = GIF();
  let gifURL: any;

  const drawImage = (image: any, x: number, y: number, scale: number, rot: number) => {
    if (ctx) {
      ctx.setTransform(scale, 0, 0, scale, x, y); // 수평확대/축소, 수직경사, 수평경사, 수직확대/축소, 수평이동, 수직이동
      ctx.rotate(rot); // 회전
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  };

  // 중앙 맞추기
  let w = canvas?.width;
  let h = canvas?.height;
  let cw = w ? w / 2 : window.innerWidth / 2;
  let ch = h ? h / 2 : window.innerHeight / 2;

  const update = () => {
    if (ctx && canvas) {
      // transform값 초기화
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      // 창 크기 변했을 때 w,h 조정
      if (w !== window.innerWidth || h !== window.innerHeight) {
        cw = (w = canvas.width = window.innerWidth) / 2;
        ch = (h = canvas.height = window.innerHeight) / 2;
      } else {
        // 기존 내용 지우기
        ctx.clearRect(0, 0, w, h);
      }
      if (myGif && myGif.lastFrame !== null)
        // 이미지 새로 그려주기
        drawImage((myGif.lastFrame as any).image, cw, ch, 1, 0);
    }
    requestAnimationFrame(update); // 연속된 이미지 보여주기
  };

  // resize시 canvas의 크기 상태를 변경하는 부분
  const handleResize = () => {
    console.log(`화면 사이즈 ${window.innerWidth}, ${window.innerHeight}`);
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  };

  // 랜덤한 gif사진을 뽑아서 출력
  const randomSelect = () => {
    const randomNum = Math.floor(Math.random() * CheersGifNum) + 1;
    gifURL = `/images/beer-cheers${randomNum}.gif`;
    myGif.load(gifURL);
    if (isCheers) {
      requestAnimationFrame(update);
    }
    // 5초후에 false로 바꿔서 버튼 동작하게 만듦
    setTimeout(() => {
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
