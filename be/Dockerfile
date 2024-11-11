FROM project_febe_base

WORKDIR /app/be

# Install Chromium dependencies before yarn install
RUN apt-get update \
    && apt-get install -y chromium \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to use system-installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

ENV PORT=5000
ENV FRONTEND_URL=http://fe:3001

# Add debugging to see Chromium path
RUN ls -la /usr/bin/chromium*

CMD ["node", "dist/server.js"]