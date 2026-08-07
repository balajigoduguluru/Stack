module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  version         = "~> 19.0"
  cluster_name    = "stack-cluster-${var.environment}"
  cluster_version = "1.28"

  vpc_id                   = "vpc-12345678" # Placeholder: assume existing VPC
  subnet_ids               = ["subnet-abcde012", "subnet-bcdef234", "subnet-cdefg345"]
  control_plane_subnet_ids = ["subnet-abcde012", "subnet-bcdef234", "subnet-cdefg345"]

  eks_managed_node_groups = {
    standard = {
      min_size     = 2
      max_size     = 10
      desired_size = 3

      instance_types = ["t3.xlarge"]
      capacity_type  = "ON_DEMAND"
    }
  }
}
