# Dockerfile
FROM node:22

WORKDIR /usr/scr/app/my-app

COPY . .

RUN npm install

RUN npx prisma migrate deploy
RUN node prisma/seed.ts

CMD ["npm", "start"]