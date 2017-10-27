FROM ubuntu

MAINTAINER Glenn Dayton

WORKDIR /src

COPY package.json /src
# VOLUME /root/budget-tracker/node:/src
VOLUME /Users/gdayton/Documents/budget-tracker/node:/src

RUN npm install
RUN npm install nodemon -g

EXPOSE 81

#ENTRYPOINT ["npm", "start"]
ENTRYPOINT ["npm", "run", "dev"]