FROM project_febe_base

WORKDIR /app/be

# Install dependencies for react-pdf
RUN apt-get update \
    && apt-get install -y \
    libfontconfig1 \
    libfreetype6 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to use system-installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

ENV PORT=5000

CMD ["node", "dist/server.js"]