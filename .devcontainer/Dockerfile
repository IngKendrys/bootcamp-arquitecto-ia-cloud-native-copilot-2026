FROM mcr.microsoft.com/devcontainers/universal:2

# Work around broken Yarn signing key in the base image that breaks apt update during feature installation.
RUN set -eux; \
    rm -f /etc/apt/sources.list.d/yarn.list
