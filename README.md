# batch-normalizer

Minimal unattended CSV batch normalizer service used by our nightly runner.

## Running

```
npm start   # start the service on PORT (default 8080)
```

The service exposes a `/health` endpoint and a `normalize()` helper that trims and
lowercases input rows.
