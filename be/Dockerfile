FROM node:18

WORKDIR /app/be

# Install dependencies for react-pdf and Chromium
RUN apt-get update && \
    apt-get install -y \
    libfontconfig1 \
    libfreetype6 \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to use system-installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

# Copy static PDFs to the correct location relative to dist
COPY src/staticPdfs ./staticPdfs/

ENV PORT=5000

CMD ["node", "dist/server.js"]