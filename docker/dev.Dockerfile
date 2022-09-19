FROM node:16.3.0

WORKDIR /app

COPY package.json /app

RUN npm install

ARG PORT=5051

COPY . /app

VOLUME [ "/app/node_modules" ]

EXPOSE $PORT

CMD ["npm", "run", "start:docker"]
