# Etapa 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json y lockfile
COPY package*.json ./

# Instalar todas las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar el proyecto
RUN npm run build

# Etapa 2: Runner (Producción)
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiar solo lo necesario
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

EXPOSE 3000

CMD ["npm", "start"]
