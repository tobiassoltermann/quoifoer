FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

RUN npm install
WORKDIR /build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
EXPOSE 3000
COPY --from=builder /build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
