FROM node:16-alpine AS frontend-build

WORKDIR /app/frontend

# Installation et build du frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:16-alpine

WORKDIR /app

# Copie du build frontend dans le dossier public du backend
COPY --from=frontend-build /app/frontend/build ./backend/public

# Installation des dépendances backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production

# Copie des fichiers backend
COPY backend/ ./

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); const options = { timeout: 2000 }; const req = http.request('http://localhost:5000/api/health', options, (res) => process.exit(res.statusCode === 200 ? 0 : 1)); req.on('error', () => process.exit(1)); req.end();"

CMD ["node", "server.js"]