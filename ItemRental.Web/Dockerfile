FROM node:21
RUN corepack enable
RUN corepack prepare pnpm@8.14.1 --activate

WORKDIR /app

COPY ./ItemRental.Web/package.json .

RUN pnpm install

COPY . .

EXPOSE 5173

CMD [ "pnpm", "run", "dev" ]