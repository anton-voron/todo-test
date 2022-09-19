FROM node:16.3.0

WORKDIR /app

COPY package.json /app

RUN npm install

ARG PORT=8080
ARG GRPC_PORT=5051

COPY . /app

VOLUME [ "/app/node_modules" ]

EXPOSE $PORT $GRPC_PORT

CMD ["npm", "run", "start:docker"]
