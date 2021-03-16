FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Run server
CMD ["npm", "start"]