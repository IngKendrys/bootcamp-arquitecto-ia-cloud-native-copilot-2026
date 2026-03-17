# Prompts para Mobile React Native + Expo

## Prompt principal
```text
Act as a senior React Native engineer.
Build a mobile app (Expo + TypeScript) for enrollment flow:
- login with OIDC PKCE
- users/courses list
- enrollment create and status view
- API client with token interceptor
- loading/error states
- basic test coverage

Return:
1. app structure
2. screen code
3. auth and API service code
4. emulator run commands
```

## Prompt de hardening mobile
```text
Review this React Native app and improve:
- token storage security
- network resilience (timeout/retry)
- offline fallback strategy
- crash-safe error boundaries

Return concrete code edits and a QA checklist.
```
