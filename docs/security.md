# Security Model

## Upload security

- Files are stored through a storage adapter and can be encrypted before object storage writes.
- Malware scanning is a provider hook in the upload route.
- File retention defaults to automatic deletion after `FILE_RETENTION_HOURS`.
- Downloads should use short-lived signed URLs.
- Aadhaar masking is treated as a privacy workflow, not just an image edit.

## App security

- Helmet security headers and CORS restrictions are enabled in the API.
- Next.js adds frame, content-type, referrer, and permissions headers.
- API rate limiting protects public endpoints.
- JWT access tokens are short-lived and refresh tokens should be stored hashed in the database.
- Admin APIs require role-based authorization.

## AI security

- AI requests should flow through the backend to enforce quotas, logging, moderation, and prompt controls.
- Streaming responses are useful for UX, but production systems should still apply policy checks around prompts, files, and saved outputs.
- Citation-aware answers should be grounded in indexed document chunks.

## Compliance checklist

- Replace development secrets.
- Enforce HTTPS at the edge.
- Configure private S3 buckets.
- Enable database backups and point-in-time recovery.
- Add upload content-type validation and file signature checks.
- Add audit logs for admin actions and sensitive file operations.
