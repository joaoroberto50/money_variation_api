FROM node:18-alpine

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=critical

RUN npm run build

RUN rm -rf src/ test/ READEME.md prisma/*.sql

CMD ["npm", "run", "start:prod"]