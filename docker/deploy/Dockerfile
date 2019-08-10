FROM node:8.11.2-alpine

WORKDIR /usr/app

EXPOSE 3000

ENV ADDR=host.docker.internal

COPY . .

COPY ./docker/deploy/bin/entrypoint.sh /entrypoint.original.sh

RUN awk '{ sub("\r$", ""); print }' /entrypoint.original.sh > /entrypoint.sh \
  && chmod +x /entrypoint.sh


ENTRYPOINT [ "/entrypoint.sh" ]