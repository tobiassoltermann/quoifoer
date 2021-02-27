FROM node:13.12.0-alpine as builder

# copy the package.json to install dependencies
COPY package.json ./

RUN npm install
RUN npm install react-scripts@3.4.1 -g 
WORKDIR /build
COPY . .
RUN npm run build

FROM nginx:stable-alpine
EXPOSE 3000
COPY --from=builder /build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
