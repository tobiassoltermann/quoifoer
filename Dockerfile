FROM nginx:stable-alpine
ADD ./build /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]