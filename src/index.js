// batch-normalizer: minimal unattended CSV normalizer service.
const http = require("http");

function normalize(row) {
  return String(row || "").trim().replace(/\s+/g, " ").toLowerCase();
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  res.writeHead(404);
  res.end();
});

if (require.main === module) {
  const port = process.env.PORT || 8080;
  server.listen(port, () => console.log(`batch-normalizer listening on ${port}`));
}

module.exports = { normalize };
