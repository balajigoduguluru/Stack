resource "aws_s3_bucket" "assets" {
  bucket = "stack-assets-${var.environment}-xyz"
}

resource "aws_s3_bucket_versioning" "assets_versioning" {
  bucket = aws_s3_bucket.assets.id
  versioning_configuration {
    status = "Enabled"
  }
}
