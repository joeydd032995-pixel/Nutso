import crypto from "node:crypto";
export type RNGOptions = { serverSeed: string; clientSeed: string; nonce: number };
export function randomHex(bytes = 32): string { return crypto.randomBytes(bytes).toString("hex"); }
export function sha256(input: string): string { return crypto.createHash("sha256").update(input).digest("hex"); }
export function hmacSha256(key: string, message: string): string {
  return crypto.createHmac("sha256", key).update(message).digest("hex");
}
export function* bytesGenerator({ serverSeed, clientSeed, nonce }: RNGOptions): Generator<number, number, never> {
  let currentRound = 0;
  let currentRoundCursor = 0;
  while (true) {
    const hmac = crypto.createHmac("sha256", serverSeed);
    hmac.update(`${clientSeed}:${nonce}:${currentRound}`);
    const buffer = hmac.digest();
    while (currentRoundCursor < 32) {
      yield Number(buffer[currentRoundCursor]);
      currentRoundCursor += 1;
    }
    currentRoundCursor = 0;
    currentRound += 1;
  }
}
export function* floatsGenerator(options: RNGOptions): Generator<number, number, never> {
  const byteRng = bytesGenerator(options);
  while (true) {
    const bytes = Array(4).fill(0).map(() => byteRng.next().value);
    const float = bytes.reduce((result, value, i) => result + value / 256 ** (i + 1), 0);
    yield float;
  }
}
export function nextFloat(options: RNGOptions): number { return floatsGenerator(options).next().value; }
export function takeFloats(options: RNGOptions, count: number): number[] {
  const rng = floatsGenerator(options);
  return Array.from({ length: count }, () => rng.next().value);
}
export function crashPointFromSeed(serverSeed: string, clientSeed: string, nonce: number, houseEdge = 0.01): number {
  const float = nextFloat({ serverSeed, clientSeed, nonce });
  const m = 100_000_000;
  const n = Math.floor(float * m) + 1;
  const crashPoint = Math.max((m / n) * (1 - houseEdge), 1);
  return Math.floor(crashPoint * 100) / 100;
}
