# Step 1: Build the application
FROM node:21 AS builder
WORKDIR /app
COPY ./ItemRental.Web/package.json ./ItemRental.Web/pnpm-lock.yaml ./
RUN pnpm run install

COPY . .

RUN pnpm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]