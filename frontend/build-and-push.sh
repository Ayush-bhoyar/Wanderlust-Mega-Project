#!/bin/bash

# Script to build and push generic Docker image
# This creates a reusable image that can be configured at runtime

# Configuration
IMAGE_NAME="wanderlust-frontend"
TAG="latest"
DOCKER_HUB_USERNAME="your-dockerhub-username"

echo "Building generic Docker image..."

# Build the generic image
docker build -f Dockerfile.generic -t $IMAGE_NAME:$TAG .

echo "Image built successfully!"

# Tag for Docker Hub
docker tag $IMAGE_NAME:$TAG $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG

echo "Tagged for Docker Hub: $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG"

# Push to Docker Hub (uncomment when ready)
# echo "Pushing to Docker Hub..."
# docker push $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG

echo "✅ Generic image ready!"
echo "Usage: docker run -p 3000:80 -e VITE_API_PATH=https://your-api.com $DOCKER_HUB_USERNAME/$IMAGE_NAME:$TAG"
