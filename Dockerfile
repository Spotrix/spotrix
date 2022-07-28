#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

######################################################################
# PY stage that simply does a pip install on our requirements
######################################################################
ARG PY_VER=3.7.9
FROM python:${PY_VER} AS spotrix-py

RUN mkdir /app \
        && apt-get update -y \
        && apt-get install -y --no-install-recommends \
            build-essential \
            default-libmysqlclient-dev \
            libpq-dev \
            libsasl2-dev \
            libecpg-dev \
        && rm -rf /var/lib/apt/lists/*

# First, we just wanna install requirements, which will allow us to utilize the cache
# in order to only build if and only if requirements change
COPY ./requirements/*.txt  /app/requirements/
COPY setup.py MANIFEST.in README.md /app/
COPY spotrix-frontend/package.json /app/spotrix-frontend/
RUN cd /app \
    && mkdir -p spotrix/static \
    && touch spotrix/static/version_info.json \
    && pip install --no-cache -r requirements/local.txt


######################################################################
# Node stage to deal with static asset construction
######################################################################
FROM node:14 AS spotrix-node

ARG NPM_VER=7
RUN npm install -g npm@${NPM_VER}

ARG NPM_BUILD_CMD="build"
ENV BUILD_CMD=${NPM_BUILD_CMD}

# NPM ci first, as to NOT invalidate previous steps except for when package.json changes
RUN mkdir -p /app/spotrix-frontend
RUN mkdir -p /app/spotrix/assets
COPY ./docker/frontend-mem-nag.sh /
COPY ./spotrix-frontend/package* /app/spotrix-frontend/
RUN /frontend-mem-nag.sh \
        && cd /app/spotrix-frontend \
        && npm ci

# Next, copy in the rest and let webpack do its thing
COPY ./spotrix-frontend /app/spotrix-frontend
# This is BY FAR the most expensive step (thanks Terser!)
RUN cd /app/spotrix-frontend \
        && npm run ${BUILD_CMD} \
        && rm -rf node_modules


######################################################################
# Final lean image...
######################################################################
ARG PY_VER=3.7.9
FROM python:${PY_VER} AS lean

ENV LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    FLASK_ENV=production \
    FLASK_APP="spotrix.app:create_app()" \
    PYTHONPATH="/app/pythonpath" \
    SPOTRIX_HOME="/app/spotrix_home" \
    SPOTRIX_PORT=8088

RUN mkdir -p ${PYTHONPATH} \
        && useradd --user-group -d ${SPOTRIX_HOME} -m --no-log-init --shell /bin/bash spotrix \
        && apt-get update -y \
        && apt-get install -y --no-install-recommends \
            build-essential \
            default-libmysqlclient-dev \
            libsasl2-modules-gssapi-mit \
            libpq-dev \
        && rm -rf /var/lib/apt/lists/*

COPY --from=spotrix-py /usr/local/lib/python3.7/site-packages/ /usr/local/lib/python3.7/site-packages/
# Copying site-packages doesn't move the CLIs, so let's copy them one by one
COPY --from=spotrix-py /usr/local/bin/gunicorn /usr/local/bin/celery /usr/local/bin/flask /usr/bin/
COPY --from=spotrix-node /app/spotrix/static/assets /app/spotrix/static/assets
COPY --from=spotrix-node /app/spotrix-frontend /app/spotrix-frontend

## Lastly, let's install spotrix itself
COPY spotrix /app/spotrix
COPY setup.py MANIFEST.in README.md /app/
RUN cd /app \
        && chown -R spotrix:spotrix * \
        && pip install -e .

COPY ./docker/docker-entrypoint.sh /usr/bin/

WORKDIR /app

USER spotrix

HEALTHCHECK CMD curl -f "http://localhost:$SPOTRIX_PORT/health"

EXPOSE ${SPOTRIX_PORT}

ENTRYPOINT ["/usr/bin/docker-entrypoint.sh"]

######################################################################
# Dev image...
######################################################################
FROM lean AS dev
ARG GECKODRIVER_VERSION=v0.28.0
ARG FIREFOX_VERSION=88.0

COPY ./requirements/*.txt ./docker/requirements-*.txt/ /app/requirements/

USER root

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends libnss3 libdbus-glib-1-2 libgtk-3-0 libx11-xcb1

# Install GeckoDriver WebDriver
RUN wget https://github.com/mozilla/geckodriver/releases/download/${GECKODRIVER_VERSION}/geckodriver-${GECKODRIVER_VERSION}-linux64.tar.gz -O /tmp/geckodriver.tar.gz && \
    tar xvfz /tmp/geckodriver.tar.gz -C /tmp && \
    mv /tmp/geckodriver /usr/local/bin/geckodriver && \
    rm /tmp/geckodriver.tar.gz

# Install Firefox
RUN wget https://download-installer.cdn.mozilla.net/pub/firefox/releases/${FIREFOX_VERSION}/linux-x86_64/en-US/firefox-${FIREFOX_VERSION}.tar.bz2 -O /opt/firefox.tar.bz2 && \
    tar xvf /opt/firefox.tar.bz2 -C /opt && \
    ln -s /opt/firefox/firefox /usr/local/bin/firefox

# Cache everything for dev purposes...
RUN cd /app \
    && pip install --no-cache -r requirements/docker.txt \
    && pip install --no-cache -r requirements/requirements-local.txt || true
USER spotrix


######################################################################
# CI image...
######################################################################
FROM lean AS ci

COPY --chown=spotrix ./docker/docker-bootstrap.sh /app/docker/
COPY --chown=spotrix ./docker/docker-init.sh /app/docker/
COPY --chown=spotrix ./docker/docker-ci.sh /app/docker/

RUN chmod a+x /app/docker/*.sh

CMD /app/docker/docker-ci.sh
