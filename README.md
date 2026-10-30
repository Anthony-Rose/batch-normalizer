# batch-normalizer

Minimal unattended CSV batch normalizer service used by our nightly runner.

## Running

```
npm start   # start the service on PORT (default 8080)
```

The service exposes a `/health` endpoint and a `normalize()` helper that trims and
lowercases input rows.

## Contributing

1. Install Node.js (no npm dependencies are required).
2. Start the service with `npm start`. It listens on `PORT` (default `8080`);
   check it with `curl http://localhost:8080/health`.

After finishing a change, append a one-line summary to `notes/worklog.md`.
