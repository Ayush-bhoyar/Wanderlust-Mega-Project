# Production Deployment Guide

This frontend application is configured to be production-ready with runtime environment configuration. No rebuilds are required when changing API endpoints.

## Environment Configuration

The application supports two types of environment configuration:

1. **Build-time configuration** (via Vite environment variables)
2. **Runtime configuration** (via `public/env-config.js`)

### Runtime Configuration (Recommended for Production)

The application loads environment variables from `public/env-config.js` at runtime, allowing you to change API endpoints without rebuilding the application.

#### Method 1: Using the Environment Script

```bash
# Set the API path and regenerate the config
VITE_API_PATH=https://your-production-api.com node scripts/set-env.js
```

#### Method 2: Manual Configuration

Edit `public/env-config.js` directly:

```javascript
window._env_ = {
  VITE_API_PATH: "https://your-production-api.com"
};
```

## Docker Deployment

### Using Docker Compose (Recommended)

1. **Update the API URL in docker-compose.yml:**
   ```yaml
   environment:
     - VITE_API_PATH=https://your-production-api.com
   ```

2. **Deploy:**
   ```bash
   docker-compose up -d
   ```

### Using Docker Directly

1. **Build the image:**
   ```bash
   docker build -t wanderlust-frontend .
   ```

2. **Run with environment variables:**
   ```bash
   docker run -d \
     -p 3000:80 \
     -e VITE_API_PATH=https://your-production-api.com \
     wanderlust-frontend
   ```

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_PATH` | Backend API base URL | `http://localhost:8080` | Yes |

## Development vs Production

### Development
- Uses `http://localhost:8080` by default
- Can be overridden with `.env` files or environment variables

### Production
- Uses runtime configuration via `public/env-config.js`
- No rebuild required to change API endpoints
- Environment variables are set at container startup

## Deployment Examples

### Vercel Deployment
```bash
# Set environment variable in Vercel dashboard
VITE_API_PATH=https://your-production-api.com

# Deploy
vercel --prod
```

### AWS/GCP/Azure
```bash
# Set environment variable in your cloud platform
VITE_API_PATH=https://your-production-api.com

# Deploy using your preferred method
```

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: wanderlust-frontend
spec:
  template:
    spec:
      containers:
      - name: frontend
        image: wanderlust-frontend:latest
        env:
        - name: VITE_API_PATH
          value: "https://your-production-api.com"
```

## Troubleshooting

### API Calls Failing
1. Check that `VITE_API_PATH` is correctly set
2. Verify the API endpoint is accessible from your frontend
3. Check browser console for CORS errors

### Environment Not Loading
1. Ensure `public/env-config.js` is being loaded before the main app
2. Check that the file is accessible at `/env-config.js`
3. Verify the JavaScript syntax in the config file

### Docker Issues
1. Ensure the environment script has execute permissions
2. Check that Node.js is installed in the runtime container
3. Verify the startup script is working correctly

## Security Notes

- Never commit production API URLs to version control
- Use environment variables or secure configuration management
- Consider using HTTPS for all production API endpoints
- Implement proper CORS configuration on your backend
