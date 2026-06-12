# Docker Documentation

## Containers
- **frontend**: Runs the Expo web bundler in development and Nginx in production.
- **backend**: Node.js backend.
- **mongodb**: Persistent database using volumes.
- **redis**: Cache layer.

## Networks
All containers run on `app-network` (bridge), allowing internal resolution via service names (e.g., `mongodb:27017`).

## Commands
- Start stack: `docker-compose up --build`
- Start detached: `docker-compose up -d`
- Stop stack: `docker-compose down`
- View logs: `docker-compose logs -f`

## Deployment
For AWS ECS, Render, or Railway, use the provided Dockerfiles. Multi-stage builds ensure small production image sizes.
