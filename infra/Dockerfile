# Copyright (c) 2021 eContriver LLC
#
# Build with:
#  docker build -t ts_deps:0.1 -f Dockerfile .

FROM ubuntu:20.04

RUN dpkg --add-architecture i386

# Optional, upgrade the entire system
#RUN apt-get upgrade

ENV TZ=America/Denver
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

####
# Download 
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get update && apt-get install -y \
  curl \
  unzip \
  vim-gtk3 \
  vim \
  nodejs \
  npm \
  locate \
  git \
  sudo \
  && apt-get clean && apt-get purge

####
# NPM Install
RUN npm install -g typescript
# RUN npm install -g webpack webpack-cli ts-loader 

####
# Add vscode user as VSCode doesn't play well with root
RUN adduser --disabled-password vscode
# RUN chown vscode:vscode /home/vscode
RUN echo 'vscode  ALL=(ALL) /bin/su' >>  /etc/sudoers

####
# VS Code Install
RUN curl https://az764295.vo.msecnd.net/stable/ea3859d4ba2f3e577a159bc91e3074c5d85c0523/code_1.52.1-1608136922_amd64.deb > /tmp/install.deb
RUN apt install -y /tmp/install.deb && apt-get clean && apt-get purge

####
# Index
RUN updatedb

####
# Size
# 2021-01-17 ? GB
