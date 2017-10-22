FROM node

MAINTAINER Glenn Dayton

WORKDIR /src

VOLUME /Users/gdayton/Documents/budget-tracker/node:/src

RUN npm install
RUN npm install nodemon -g

EXPOSE 81

ENTRYPOINT ["npm", "run", "dev"]