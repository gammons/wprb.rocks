FROM ubuntu
RUN apt update && apt install -y mysql-client awscli
RUN mkdir /app
WORKDIR /app
COPY backup.sh /app/backup.sh
