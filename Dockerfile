FROM node:19

# Use production node environment by default.
ENV NODE_ENV ${NODE_ENV}


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm install

# Set permissions for the application directory
#RUN chown -R node:node /usr/src/app
# Run the application as a non-root user.
#USER node

# Copy the rest of the source files into the image.
COPY --chown=node:node . .

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 3000

CMD ["npm", "run", "start"]

