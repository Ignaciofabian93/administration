FROM node:22

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 4001

CMD [ "npm", "start" ]