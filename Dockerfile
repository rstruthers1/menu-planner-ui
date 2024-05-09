# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Step 7: Install serve or any similar static server tool
RUN npm install -g serve

# Step 8: Set the command to start the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]