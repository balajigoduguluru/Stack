resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "stack-redis-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t4g.medium"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}
