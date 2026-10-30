# batch-normalizer

Minimal unattended CSV batch normalizer service used by our nightly runner.

## Running

```
npm start          # start the service
npm run env-setup  # verify + provision the workspace environment
```

The nightly runner provisions the workspace and then runs `env-setup` to
confirm the environment is ready before processing batches.
