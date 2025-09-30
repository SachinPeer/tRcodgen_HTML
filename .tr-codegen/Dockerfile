# Multi-stage build for User Management System
FROM nginx:alpine as production

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy application files from parent directory
COPY ../index.html .
COPY ../styles.css .
COPY ../script.js .

# Copy custom nginx configuration
COPY .tr-codegen/nginx.conf /etc/nginx/conf.d/default.conf

# Create logs directory
RUN mkdir -p /var/log/nginx

# Set proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port 80
EXPOSE 80

# Add labels for better container management
LABEL maintainer="TR-Codegen User Management System"
LABEL description="Containerized User Management System with intentional bugs for testing"
LABEL version="2.0"
LABEL project="tr-codegen"

# Health check to ensure nginx is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
