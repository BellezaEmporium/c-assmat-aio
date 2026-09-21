FROM node:20-bullseye

WORKDIR /app

# Copie uniquement package.json et package-lock.json pour tirer parti du cache Docker
COPY package*.json ./

# Installation propre
RUN npm install -g npm@10 \
    && npm install --no-audit --no-fund

# Copie du reste du projet
COPY . .

EXPOSE 5173

# Démarrage du serveur Vite
CMD ["npm", "run", "dev", "--", "--host"]
