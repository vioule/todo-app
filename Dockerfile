FROM node:20.11.0

COPY . /root/todo-app
WORKDIR /root/todo-app
RUN npm i 

EXPOSE 3000