module "db" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "stack-postgres-${var.environment}"

  engine               = "postgres"
  engine_version       = "16"
  family               = "postgres16"
  major_engine_version = "16"
  instance_class       = "db.t4g.large"

  allocated_storage = 100
  max_allocated_storage = 500

  db_name  = "stackdb"
  username = "postgres"
  password = var.db_password
  port     = 5432

  multi_az               = true
  db_subnet_group_name   = "default"
  vpc_security_group_ids = []

  backup_retention_period = 7
  storage_encrypted       = true
}
