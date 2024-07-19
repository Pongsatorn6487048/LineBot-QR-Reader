FROM node:19

# Use production node environment by default.
# ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app

# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
COPY package*.json ./

# Install Nest CLI First
RUN npm install -g @nestjs/cli
RUN npm install

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

CMD ["npm", "run", "start"]

