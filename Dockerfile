# Use official Node.js image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy all other files
COPY . .

# Expose port 3000 (React default dev server port)
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]