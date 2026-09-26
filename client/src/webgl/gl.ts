export function makeGL(canvas: HTMLCanvasElement) {
  return canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: false });
}
export function compile(gl: WebGL2RenderingContext, vsSrc: string, fsSrc: string) {
  const vs = shade(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = shade(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link");
  return prog;
}
function shade(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader");
  return s;
}
export function resize(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, canvas.clientWidth);
  const h = Math.max(1, canvas.clientHeight);
  if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
  }
  gl.viewport(0, 0, canvas.width, canvas.height);
  return { w, h, dpr };
}
export function supported() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
