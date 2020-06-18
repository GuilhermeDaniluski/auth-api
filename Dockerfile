FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 80

# Add wait-for-it
COPY wait-for-it.sh wait-for-it.sh 
RUN chmod +x wait-for-it.sh
