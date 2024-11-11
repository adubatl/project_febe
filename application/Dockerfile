FROM node:18

WORKDIR /app/application

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

RUN yarn global add serve

ENV REACT_APP_BE_URL=http://be:5000

CMD ["serve", "-s", "build", "-l", "3000"]