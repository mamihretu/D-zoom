FROM python:3.8-slim-bullseye

ENV PYTHONUNBUFFERED=1

# Install apt packages
RUN apt update && apt install --no-install-recommends -y \
  # dependencies for building Python packages
  build-essential

WORKDIR /django

COPY ./requirements .
RUN pip3 install -r base.txt

COPY ./Docker/test/django/start /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start
