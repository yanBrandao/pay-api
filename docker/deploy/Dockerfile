FROM node:8.11.2-alpine

WORKDIR /usr/app

RUN npm config set unsafe-perm true \
    && npm install -g yarn \
    && yarn config set cache-folder /root/.yarn.cache

EXPOSE 3000

COPY . .

COPY ./docker/deploy/bin/entrypoint.sh /entrypoint.original.sh

RUN awk '{ sub("\r$", ""); print }' /entrypoint.original.sh > /entrypoint.sh \
  && chmod +x /entrypoint.sh


ENTRYPOINT [ "/entrypoint.sh" ]