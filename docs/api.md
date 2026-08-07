# API Overview

Base URL: `/v1`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/otp/request`
- `POST /auth/otp/verify`
- `POST /auth/google`
- `GET /auth/me`

Auth uses JWT access and refresh tokens. Role support: `student`, `teacher`, `admin`, `institute`.

## AI

- `POST /ai/chat`: streams server-sent events for academic AI modes.
- `POST /ai/usage-estimate`: estimates token usage against plan limits.

Supported modes include PDF summarizer, notes generator, flashcards, simplifier, translator, PDF Q&A, research assistant, assignment helper, resume builder, and cover letter generator.

## Documents

- `POST /documents/upload`: multipart upload with malware scan hook and storage adapter.
- `POST /documents/jobs`: create PDF/image/Office/exam processing job.
- `GET /documents/jobs/:id`: fetch job status.
- `GET /documents/history`: fetch recent download history.

## OCR

- `POST /ocr/extract`: multipart upload with language parameter. Returns editable text and export options.

## Tools and calculators

- `GET /tools`
- `GET /tools/:slug`
- `POST /tools/calculators/cgpa`
- `POST /tools/calculators/attendance`

## Workspace

- `GET /workspace/dashboard`
- `GET /workspace/projects`

## Admin

- `GET /admin/metrics`
- `GET /admin/ads`

Admin routes require `admin` role.
