FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install dependencies for Cypress
RUN apk add --no-cache udev ttf-freefont chromium nss freetype harfbuzz ca-certificates xvfb

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "serve"]