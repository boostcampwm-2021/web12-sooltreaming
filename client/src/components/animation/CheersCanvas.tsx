import React, { useState, useRef, useEffect } from 'react';
import { FullScreen } from './CheersCanvas.style';
import { GIF } from './GIF';

const CheersCanvas = ({ isCheers, setIsCheers }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth);
  const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight);
  const CheersAnimationNum = 2;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  let animated;
  let animated2;

  let myGif = GIF();
  let gifURL;

  function drawImage(image, x, y, scale, rot) {
    if (ctx) {
      ctx.setTransform(scale, 0, 0, scale, x, y); // 수평확대/축소, 수직경사, 수평경사, 수직확대/축소, 수평이동, 수직이동
      ctx.rotate(rot); // 회전
      ctx.drawImage(image, -image.width / 2, -image.height / 2);
    }
  }
  /*
  // 파편꾸미기 개꿀잼
  const rand = (min = 1, max = min + (min = 0)) => Math.random() * (max - min) + min;
  const setOf = (c, C) => {
    let a: any = [],
      i = 0;
    while (i < c) {
      a.push(C(i++));
    }
    return a;
  };
  const eachOf = (a, C) => {
    let i = 0;
    const l = a.length;
    while (i < l && C(a[i], i++, l) !== true);
    return i;
  };
  const mod = (v, m) => ((v % m) + m) % m;

  // create 100 particles
  const particles = setOf(100, () => {
    return {
      x: rand(window.innerWidth),
      y: rand(window.innerHeight),
      scale: rand(0.15, 0.5),
      rot: rand(Math.PI * 2),
      frame: 0,
      frameRate: rand(-2, 2),
      dr: rand(-0.1, 0.1),
      dx: rand(-4, 4),
      dy: rand(-4, 4),
    };
  });
  // Animate and draw 100 particles
  function drawParticles() {
    eachOf(particles, (part) => {
      part.x += part.dx;
      part.y += part.dy;
      part.rot += part.dr;
      part.frame += part.frameRate;
      part.x = mod(part.x, window.innerWidth);
      part.y = mod(part.y, window.innerHeight);
      let frame = mod(part.frame, myGif.frames.length) | 0;

      drawImage(myGif.frames[frame].image, part.x, part.y, part.scale, part.rot);
    });
  }
  */

  // 중앙 맞추기
  let w = canvas?.width;
  let h = canvas?.height;
  let cw = w ? w / 2 : window.innerWidth / 2;
  let ch = h ? h / 2 : window.innerHeight / 2;

  function update() {
    if (ctx && canvas) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
      if (w !== window.innerWidth || h !== window.innerHeight) {
        cw = (w = canvas.width = window.innerWidth) / 2;
        ch = (h = canvas.height = window.innerHeight) / 2;
      } else {
        ctx.clearRect(0, 0, w, h);
      }
      if (myGif) {
        if (myGif.lastFrame !== null) {
          // Shows frames as they load
          drawImage((myGif.lastFrame as any).image, cw, ch, 1, 0);
        }
      }
    }
    animated = requestAnimationFrame(update);
  }

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
    gifURL = `/images/beer-cheers${randomNum}.gif`;
    myGif.load(gifURL);
    console.log(randomNum);
    if (isCheers) {
      animated2 = requestAnimationFrame(update);
    }
    setTimeout(() => {
      if (canvas && ctx) {
        console.log(ctx);
        cancelAnimationFrame(animated2);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        console.log(ctx);
      }
      setIsCheers(false);
    }, 5000);
    console.log(ctx);
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
