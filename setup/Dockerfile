FROM mysql:8
ENV LANG=C.UTF-8
COPY ./create-database.sql /docker-entrypoint-initdb.d/
COPY ./insert-data.sql /docker-entrypoint-initdb.d/