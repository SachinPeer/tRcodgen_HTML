# 🐳 Docker Setup for User Management System

This directory contains Docker configuration files to run the User Management System in a containerized environment.

## 📁 Docker Files Overview

```
tRcodgen_HTML/
├── Dockerfile              # Container image definition
├── docker-compose.yml      # Multi-service orchestration
├── nginx.conf             # Nginx web server configuration
└── DOCKER_README.md       # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+

### Basic Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SachinPeer/tRcodgen_HTML.git
   cd tRcodgen_HTML
   git checkout app
   ```

2. **Start the application:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Open your browser and go to: http://localhost:8080
   - The User Management System will be running!

4. **Stop the application:**
   ```bash
   docker-compose down
   ```

## 🛠️ Detailed Commands

### Build and Run
```bash
# Build and start in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f user-management-app

# Check container status
docker-compose ps
```

### Development Mode
```bash
# Start with live logs
docker-compose up

# Rebuild after code changes
docker-compose up --build
```

### Advanced Usage

#### With Reverse Proxy (Traefik)
```bash
# Start with Traefik reverse proxy
docker-compose --profile proxy up -d

# Access via:
# - App: http://localhost
# - Traefik Dashboard: http://localhost:8081
```

#### With Monitoring
```bash
# Start with Nginx metrics exporter
docker-compose --profile monitoring up -d

# Metrics available at: http://localhost:9113/metrics
```

#### All Services
```bash
# Start everything
docker-compose --profile proxy --profile monitoring up -d
```

## 🔧 Configuration Details

### Container Specifications
- **Base Image:** `nginx:alpine` (lightweight, ~23MB)
- **Port Mapping:** Host `8080` → Container `80`
- **Resource Limits:** 128MB RAM, 0.5 CPU cores
- **Health Check:** Built-in endpoint monitoring
- **Restart Policy:** `unless-stopped`

### Network Configuration
- **Network Name:** `user-management-net`
- **Driver:** Bridge network
- **Isolation:** Containers communicate internally

### Security Features
- Security headers (XSS, CSRF protection)
- Content Security Policy
- Hidden file access denied
- Gzip compression enabled

## 📊 Service Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Traefik       │    │  User Management │    │  Nginx Metrics  │
│  (Reverse Proxy)│────│     App          │────│   Exporter      │
│   Port: 80/443  │    │   Port: 8080     │    │   Port: 9113    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                    ┌─────────────────────────┐
                    │  user-management-net    │
                    │    (Bridge Network)     │
                    └─────────────────────────┘
```

## 🐛 Testing Bugs in Docker

All intentional bugs are preserved in the Docker environment:

### HTML Bug
```bash
# Access the app and test email field
curl -I http://localhost:8080
# Check form behavior in browser
```

### CSS Bug
```bash
# View page source to see button float CSS
curl http://localhost:8080 | grep -A5 -B5 "float"
```

### JavaScript Bug
```bash
# Test edit functionality via browser
# Error message will appear as expected
```

## 📝 Environment Variables

You can customize the deployment using environment variables:

```bash
# Create .env file
cat > .env << EOF
NGINX_HOST=localhost
NGINX_PORT=80
APP_PORT=8080
COMPOSE_PROJECT_NAME=user-management
EOF

# Use with docker-compose
docker-compose up -d
```

## 🔍 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using port 8080
lsof -i :8080

# Use different port
docker-compose up -d -p 8081:80
```

#### Container Won't Start
```bash
# Check logs
docker-compose logs user-management-app

# Rebuild image
docker-compose build --no-cache
```

#### Permission Issues
```bash
# Fix Docker permissions (Linux/Mac)
sudo chown -R $USER:$USER .
```

### Health Checks
```bash
# Check container health
docker inspect user-management-system | grep -A10 Health

# Manual health check
curl http://localhost:8080/health
```

## 🚀 Production Deployment

### Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml user-management
```

### Kubernetes
```bash
# Generate Kubernetes manifests
docker-compose config | kompose convert -f -

# Apply to cluster
kubectl apply -f .
```

## 📈 Performance Optimization

### Resource Limits
The container is configured with:
- **Memory Limit:** 128MB (sufficient for static content)
- **CPU Limit:** 0.5 cores (prevents resource hogging)
- **Disk:** Minimal footprint (~50MB total)

### Caching Strategy
- Static assets cached for 1 year
- Gzip compression enabled
- Nginx optimized for static content serving

## 🔐 Security Considerations

### Container Security
- Non-root user execution
- Minimal attack surface (Alpine Linux)
- No unnecessary packages installed
- Security headers configured

### Network Security
- Isolated Docker network
- No direct host access
- Health check endpoints secured

## 📚 Additional Resources

### Useful Commands
```bash
# View container resource usage
docker stats user-management-system

# Execute commands in container
docker exec -it user-management-system sh

# View nginx configuration
docker exec user-management-system cat /etc/nginx/conf.d/default.conf

# Backup container data
docker export user-management-system > backup.tar
```

### Monitoring
```bash
# Container logs
docker-compose logs -f --tail=100

# System resources
docker system df
docker system prune  # Clean up unused resources
```

## 🎯 Next Steps

1. **Customize Configuration:** Modify `nginx.conf` for specific needs
2. **Add SSL/TLS:** Configure HTTPS certificates
3. **Scale Horizontally:** Add load balancing for multiple instances
4. **Add Database:** Integrate persistent storage if needed
5. **CI/CD Integration:** Automate builds and deployments

---

**Docker Version:** Compatible with Docker Engine 20.10+  
**Last Updated:** December 2024  
**Maintainer:** User Management System Team
