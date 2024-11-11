FROM project_febe_base

WORKDIR /app/fe

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

# Configure default locale (important for chrome-headless-shell)
ENV LANG=en_US.UTF-8
ENV PORT=3001

CMD ["yarn", "start"]