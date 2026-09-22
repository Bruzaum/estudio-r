import { useEffect, useRef } from 'react';

const W = 1086;
const H = 1448;
const CONTOUR: [number, number][] = [
  [0, 650], [180, 720], [250, 766], [350, 792], [450, 799],
  [543, 812], [650, 812], [750, 801], [850, 782], [930, 716], [1086, 650],
];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function contourAt(x: number) {
  const position = clamp(x, 0, W);
  for (let i = 0; i < CONTOUR.length - 1; i++) {
    const [x1, y1] = CONTOUR[i];
    const [x2, y2] = CONTOUR[i + 1];
    if (position <= x2) {
      const t = (position - x1) / (x2 - x1);
      const previous = CONTOUR[Math.max(0, i - 1)][1];
      const next = CONTOUR[Math.min(CONTOUR.length - 1, i + 2)][1];
      return 0.5 * (2 * y1 + (-previous + y2) * t +
        (2 * previous - 5 * y1 + 4 * y2 - next) * t * t +
        (-previous + 3 * y1 - 3 * y2 + next) * t * t * t);
    }
  }
  return CONTOUR.at(-1)![1];
}

export default function HaircutScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const edgeRef = useRef<SVGPathElement>(null);
  const scissorsRef = useRef<SVGGElement>(null);
  const locksRef = useRef<(SVGImageElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const render = () => {
      frame = 0;
      const sceneRect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const raw = clamp(-sceneRect.top / travel, 0, 1);
      const progress = media.matches ? 1 : clamp((raw - 0.1) / 0.8, 0, 1);
      const eased = progress * progress * (3 - 2 * progress);
      const rect = stage.getBoundingClientRect();
      const scale = Math.max(rect.width / W, rect.height / H);
      const offsetX = (rect.width - W * scale) / 2;
      const left = clamp(-offsetX / scale, 0, W);
      const right = clamp((rect.width - offsetX) / scale, 0, W);
      const cutX = right - (right - left) * eased;
      const edgeX = cutX + 30 * (1 - 2 * progress);
      const edge: string[] = [];
      for (let y = 0; y <= H; y += 36) {
        const texture = 15 * Math.sin(y * 0.017 + 0.7) + 7 * Math.sin(y * 0.053);
        edge.push(`${edgeX + texture} ${y}`);
      }
      edge.push(`${edgeX + 15 * Math.sin(H * 0.017 + 0.7) + 7 * Math.sin(H * 0.053)} ${H}`);
      edge.push(`${W + 80} ${H}`, `${W + 80} 0`);
      edgeRef.current?.setAttribute('d', `M ${edge[0]} L ${edge.slice(1).join(' L ')} Z`);

      const bladeY = contourAt(cutX);
      const angle = -24 + 48 * eased;
      scissorsRef.current?.setAttribute('transform', `translate(${cutX - 9} ${bladeY - 33}) rotate(${angle} 9 33)`);
      scissorsRef.current?.setAttribute('opacity', !media.matches && progress > 0.015 && progress < 0.985 ? '1' : '0');
      locksRef.current.forEach((lock, index) => {
        if (!lock) return;
        const threshold = 0.10 + index * 0.017;
        const fall = clamp((progress - threshold) / 0.18, 0, 1);
        const atCut = threshold * threshold * (3 - 2 * threshold);
        const sourceX = right - (right - left) * atCut;
        const width = 50 + (index % 3) * 14;
        const height = width * 1.5;
        const x = sourceX - 18 + Math.sin(fall * 5 + index) * 28;
        const y = contourAt(sourceX) + fall * (310 + (index % 3) * 65);
        const opacity = fall > 0 && fall < 1 ? Math.min(1, fall * 8) * (1 - Math.pow(fall, 3)) * 0.85 : 0;
        lock.setAttribute('x', String(x));
        lock.setAttribute('y', String(y));
        lock.setAttribute('width', String(width));
        lock.setAttribute('height', String(height));
        lock.setAttribute('opacity', String(opacity));
        lock.setAttribute('transform', `rotate(${-18 + index * 7 + fall * 85} ${x + width / 2} ${y + height / 2})`);
      });
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(render); };
    const updateMotion = () => queue();
    updateMotion();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    media.addEventListener('change', updateMotion);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      media.removeEventListener('change', updateMotion);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="cut-scene" ref={sectionRef} aria-label="Transformação do cabelo em corte chanel ao rolar a página">
      <div className="stage" ref={stageRef}>
        <svg className="scene-svg" viewBox="0 0 1086 1448" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Cabelo loiro comprido que se transforma em corte chanel">
          <defs>
            <filter id="edge-soften" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="8" /></filter>
            <mask id="wipe-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1086" height="1448" style={{ maskType: 'alpha' }}>
              <path ref={edgeRef} fill="white" filter="url(#edge-soften)" />
            </mask>
          </defs>
          <image href="/assets/antes.webp" width={W} height={H} />
          <g mask="url(#wipe-mask)"><image href="/assets/depois-natural.webp" width={W} height={H} /></g>
          <g aria-hidden="true">{Array.from({ length: 40 }, (_, index) =>
            <image key={index} ref={element => { locksRef.current[index] = element; }} href="/assets/mecha-loira.webp" />
          )}</g>
          <g ref={scissorsRef} aria-hidden="true" opacity="0">
            <image className="scissor-open" href="/assets/tesoura.webp" width="198" height="66" />
            <image className="scissor-closed" href="/assets/tesoura-fechada.webp" width="198" height="66" />
          </g>
        </svg>
        <div className="shade" />
        <div className="scene-copy"><h1>Um corte.<br />Outra energia.</h1></div>
      </div>
    </section>
  );
}
