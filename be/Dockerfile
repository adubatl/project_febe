FROM project_febe_base

COPY . .
RUN yarn build

EXPOSE 5000

CMD ["node", "dist/server.js"]