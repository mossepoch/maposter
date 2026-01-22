# Maposter Web Application

Web interface for generating city map posters.

## Quick Start

From the project root directory:

```bash
./deploy.sh
```

## Manual Deployment

```bash
cd web

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Services

- **nginx** (80, 443) - Reverse proxy
- **frontend** (3000) - Next.js web interface
- **backend** (8000) - FastAPI map generation API

## Configuration

Edit `.env` file (auto-generated on first deploy):

```bash
ADMIN_PASSWORD=your_password
```

## SSL Setup

1. Copy SSL certificates to `nginx/ssl/`:
   - `fullchain.pem`
   - `privkey.pem`

2. Configure domain in `nginx/conf.d/ssl.conf`:
   ```bash
   cp nginx/conf.d/ssl.conf.example nginx/conf.d/ssl.conf
   nano nginx/conf.d/ssl.conf
   ```

3. Restart nginx:
   ```bash
   docker-compose restart nginx
   ```

## Troubleshooting

```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx

# Restart all services
docker-compose restart

# Rebuild after code changes
docker-compose build
docker-compose up -d
```

## More Information

See [main README](../README.md) for complete documentation.
