# Use Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the backend port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "dev"]
