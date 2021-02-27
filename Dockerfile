FROM nginx:stable-alpine
COPY . /usr/share/nginx/html
RUN npm install
RUN npm build
ADD ./build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
