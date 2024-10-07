FROM project_febe_base

COPY . .

WORKDIR /app/application

RUN yarn build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]