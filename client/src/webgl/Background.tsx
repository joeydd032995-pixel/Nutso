import { useEffect, useRef } from "react";
import { compile, makeGL, resize, supported } from "./gl";
const VS = `#version 300 es\nin vec3 a; uniform float t;\nvoid main(){ float y=a.y+0.04*sin(t*0.35+a.x*6.0); float x=a.x+0.03*cos(t*0.28+a.z*5.0); gl_Position=vec4(x,y,0.0,1.0); gl_PointSize=mix(1.2,2.8,a.z); }`;
const FS = `#version 300 es\nprecision highp float; out vec4 o; uniform float t;\nvoid main(){ float d=length(gl_PointCoord-0.5); if(d>0.5) discard; vec3 c=mix(vec3(0.49,1.0,0.60),vec3(0.78,0.42,1.0),0.5+0.5*sin(t*0.2)); o=vec4(c,(1.0-d*2.0)*0.55); }`;
export function WebGLBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!supported()) return;
    const canvas = ref.current; if (!canvas) return;
    const gl = makeGL(canvas); if (!gl) return;
    let dead = false; let prog: WebGLProgram;
    try { prog = compile(gl, VS, FS); } catch { return; }
    const n = 420; const data = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { data[i*3]=Math.random()*2-1; data[i*3+1]=Math.random()*2-1; data[i*3+2]=Math.random(); }
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a"); const ut = gl.getUniformLocation(prog, "t");
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    const t0 = performance.now();
    const loop = (now: number) => {
      if (dead) return; resize(canvas, gl); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog); gl.uniform1f(ut, (now-t0)/1000);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0);
      gl.drawArrays(gl.POINTS,0,n); requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return () => { dead = true; };
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden />;
}
