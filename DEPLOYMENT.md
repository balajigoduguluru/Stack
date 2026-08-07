# Deployment Runbook

## Infrastructure (Terraform)
1. `cd infra/`
2. `terraform init`
3. `terraform plan -out=tfplan`
4. `terraform apply tfplan`

## Application (Kubernetes)
*Manifests are located in the blueprint documentation.*
1. Build and push Docker images for `web`, `api-core`, `api-ai`.
2. Apply `Deployment`, `Service`, and `Ingress` resources via `kubectl apply -f`.
