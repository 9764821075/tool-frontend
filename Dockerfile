# STAGE: builder
FROM node:12.21.0-alpine3.12 AS builder

# Update and upgrade
RUN apk update \
 && apk upgrade \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy app files
COPY package.json .
COPY package-lock.json .
COPY .postcssrc.js .
COPY .babelrc .
COPY babel.config.js .
COPY vue.config.js .
COPY public ./public
COPY src ./src

# Install all dependencies and build
RUN npm install -g npm@latest \
 && npm install \
 && npm run build


# STAGE: final
FROM node:12.21.0-alpine3.12

# Update and upgrade
RUN apk update \
 && apk upgrade \
 && rm -rf /var/lib/apt/lists/*

# Add non-root user
RUN addgroup -S appuser \
 && adduser -S appuser -G appuser

WORKDIR /app
RUN chown -R appuser /app

ENV NODE_ENV=production

# Install prod dependencies
COPY --chown=appuser package.json .
COPY --chown=appuser package-lock.json .
RUN npm install -g npm@latest \
 && npm install
RUN chown -R appuser ./node_modules

USER appuser

# Copy app files
COPY --chown=appuser --from=builder /app/dist/ ./dist/
COPY --chown=appuser server.js .

# Prepare entrypoint
COPY --chown=appuser entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
EXPOSE 5000
