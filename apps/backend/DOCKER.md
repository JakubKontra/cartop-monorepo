# Docker Setup Guide

This guide explains how to run the Cartop Backend v3 using Docker and Docker Compose.

## Prerequisites

- Docker 24.0+ installed
- Docker Compose 2.0+ installed
- At least 2GB of free disk space

## Quick Start

### Development Environment (with hot-reload)

1. **Copy environment variables**:
```bash
cp .env.example .env
```

2. **Update JWT_SECRET** in `.env`:
```bash
# Generate a secure secret
openssl rand -base64 32

# Or use node
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

3. **Start all services**:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

4. **View logs**:
```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Just the app
docker-compose -f docker-compose.dev.yml logs -f app
```

5. **Access the application**:
- API: http://localhost:3000
- Admin GraphQL: http://localhost:3000/admin/graphql
- Public GraphQL: http://localhost:3000/public/graphql
- pgAdmin: http://localhost:5050
- Redis Commander: http://localhost:8081

### Production Environment

1. **Copy and configure environment**:
```bash
cp .env.example .env
# Edit .env and set production values
```

2. **Build and start**:
```bash
docker-compose up -d
```

3. **Start with pgAdmin** (optional):
```bash
docker-compose --profile tools up -d
```

## Available Services

### Core Services

- **app** - NestJS application (port 3000)
- **postgres** - PostgreSQL 16 database (port 5432)
- **redis** - Redis cache and queue (port 6379)

### Development Tools (dev only)

- **pgadmin** - PostgreSQL management UI (port 5050)
  - Email: admin@cartop.local
  - Password: admin (change in .env)

- **redis-commander** - Redis management UI (port 8081)

## Common Commands

### Start services
```bash
# Development
docker-compose -f docker-compose.dev.yml up -d

# Production
docker-compose up -d
```

### Stop services
```bash
# Development
docker-compose -f docker-compose.dev.yml down

# Production
docker-compose down

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
docker-compose logs -f redis
```

### Execute commands in containers
```bash
# Access app shell
docker-compose exec app sh

# Run migrations (when implemented)
docker-compose exec app npm run migration:run

# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d cartop_v3

# Access Redis CLI
docker-compose exec redis redis-cli
```

### Rebuild containers
```bash
# Rebuild specific service
docker-compose build app

# Rebuild and restart
docker-compose up -d --build app
```

### Check service health
```bash
docker-compose ps
```

## Environment Variables

### Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_USERNAME` | PostgreSQL username | postgres |
| `DB_PASSWORD` | PostgreSQL password | postgres |
| `DB_DATABASE` | Database name | cartop_v3 |
| `JWT_SECRET` | JWT signing secret | (must set) |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_PORT` | Application port | 3000 |
| `DB_HOST` | Database host | localhost (postgres in Docker) |
| `DB_PORT` | Database port | 5432 |
| `REDIS_HOST` | Redis host | localhost (redis in Docker) |
| `REDIS_PORT` | Redis port | 6379 |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `PGADMIN_PORT` | pgAdmin UI port | 5050 |

## Architecture

### Multi-stage Build (Production)

The production Dockerfile uses a multi-stage build:

1. **Builder stage**: Installs dependencies and builds the application
2. **Production stage**: Creates minimal image with only runtime dependencies

**Benefits**:
- Smaller image size (~200MB vs ~800MB)
- Faster deployments
- Improved security (no dev tools in production)

### Development Setup

The development environment mounts your source code as a volume, enabling hot-reload:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

Changes to TypeScript files automatically trigger recompilation.

## Volumes

### Persistent Data

- `postgres_data` - PostgreSQL database files
- `redis_data` - Redis persistence
- `pgadmin_data` - pgAdmin configuration

### Remove all data
```bash
docker-compose down -v
```

## Networking

All services run on a bridge network: `cartop-network` (production) or `cartop-network-dev` (development).

Services can communicate using service names:
- `app` → `postgres:5432`
- `app` → `redis:6379`

## Health Checks

All services include health checks:

- **PostgreSQL**: `pg_isready` check every 10s
- **Redis**: `redis-cli ping` every 10s
- **App**: HTTP request to `/health` every 30s

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs app

# Check if ports are already in use
lsof -i :3000
lsof -i :5432
lsof -i :6379
```

### Database connection issues

```bash
# Verify postgres is healthy
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Test connection manually
docker-compose exec postgres psql -U postgres -d cartop_v3 -c "SELECT 1"
```

### Redis connection issues

```bash
# Verify redis is healthy
docker-compose ps redis

# Test redis connection
docker-compose exec redis redis-cli ping
```

### Permission errors

If you see permission errors in development:

```bash
# Fix file ownership (Mac/Linux)
sudo chown -R $(whoami):$(whoami) .
```

### Clear everything and start fresh

```bash
# Stop all containers
docker-compose -f docker-compose.dev.yml down -v

# Remove all Cartop images
docker images | grep cartop | awk '{print $3}' | xargs docker rmi -f

# Start fresh
docker-compose -f docker-compose.dev.yml up -d --build
```

## Production Deployment

### Security Checklist

- [ ] Change all default passwords
- [ ] Set strong `JWT_SECRET`
- [ ] Use environment-specific `.env` file (don't commit!)
- [ ] Configure firewall rules
- [ ] Enable HTTPS/TLS
- [ ] Set up backup strategy for PostgreSQL
- [ ] Configure log rotation
- [ ] Set resource limits (CPU, memory)

### Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### Monitoring

View resource usage:
```bash
docker stats
```

## CI/CD Integration

### Build image
```bash
docker build -t cartop-backend:latest .
```

### Push to registry
```bash
docker tag cartop-backend:latest registry.example.com/cartop-backend:latest
docker push registry.example.com/cartop-backend:latest
```

### Deploy
```bash
docker pull registry.example.com/cartop-backend:latest
docker-compose up -d
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/recipes/docker)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Redis Docker Image](https://hub.docker.com/_/redis)
