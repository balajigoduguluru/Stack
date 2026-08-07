# Deployment

## Local Docker

```bash
cd student-utility-hub
cp .env.example .env
docker compose up --build
```

Services:

- Web: `http://localhost:3000`
- API: `http://localhost:4000`
- Postgres: `localhost:5432`
- MinIO: `http://localhost:9001`

## Vercel

Deploy `apps/web` with the included `apps/web/vercel.json`. Set:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_API_URL`

## API hosting

Deploy `Dockerfile.api` to any container host. Set:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `OPENAI_API_KEY`
- `STORAGE_PROVIDER`
- S3-compatible storage variables

## Worker services

For production, add separate workers for:

- PDF processing
- Office conversion
- OCR extraction
- Malware scanning
- Auto-delete retention sweeps
- AI document indexing
