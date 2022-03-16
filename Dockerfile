FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package-lock.json & package.json to the root of the app
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle the app source
COPY . .

EXPOSE 3000



CMD ["node", "dist/index.js"]