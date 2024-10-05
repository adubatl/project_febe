FROM project_febe_base AS build

RUN yarn global add serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]