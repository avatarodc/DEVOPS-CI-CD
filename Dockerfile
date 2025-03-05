FROM node:16-alpine

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend ./frontend
RUN cd frontend && npm run build

COPY backend ./backend
RUN mkdir -p backend/public
RUN cp -r frontend/build/* backend/public/

EXPOSE 5000

CMD ["node", "backend/server.js"]