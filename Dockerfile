FROM node:lts AS node-base
FROM openjdk:23 AS java-base
RUN ln -s "$(dirname "$(dirname "$(readlink -f "$(which java)")")")" /java_home
FROM mysql:8.0 AS mysql-base
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update || apt-get install -y gnupg && \
    mkdir -p /etc/apt/keyrings && \
    apt-get install -y software-properties-common && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32 && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 871920D1991BC93C && \
    apt-get update

COPY --from=node-base /usr/local /usr/local
COPY --from=java-base /java_home /usr/lib/jvm
COPY --from=mysql-base /usr/bin /usr/bin
COPY --from=mysql-base /etc/mysql /etc/mysql
COPY --from=mysql-base /etc/my.cnf /etc/my.cnf

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /workspace

COPY . .

COPY setup-git.sh /usr/local/bin/setup-git.sh
RUN chmod +x /usr/local/bin/setup-git.sh && /usr/local/bin/setup-git.sh

EXPOSE 5173 3000 3306

RUN cd frontend && npm install

CMD sh -c "git pull && \
    cd frontend && npm run build && \
    cd ../backend/bloodmanagementsystem && ./mvnw spring-boot:run"
