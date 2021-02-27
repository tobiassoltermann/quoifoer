FROM nginx:stable-alpine
RUN npm install
RUN npm build
ADD ./build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
