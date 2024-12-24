# FROM node:20-alpine as BUILD_IMAGE

# WORKDIR /strapi

# # Resolve node_modules for caching
# COPY ./package.json ./
# COPY ./yarn.lock ./
# RUN yarn install --production=true --frozen-lockfile

# # Copy all for build and release cache if package.json update
# COPY . .
# ENV NODE_ENV=production

# RUN yarn build

# #------------------------------------------------------------------------------------

# # Create new namespace for final Docker Image
# FROM node:20-alpine

# # Only copy your source code without system file
# COPY --from=BUILD_IMAGE /strapi /strapi

# WORKDIR /strapi

# EXPOSE 1337

# ENV NODE_ENV=production
# ENV STRAPI_LOG_LEVEL=debug

# CMD ["yarn", "start"]


#  ======================================================================

FROM node:20-alpine AS base_build

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack install --global pnpm@latest
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

WORKDIR /strapi
COPY . .

FROM base_build AS prod_build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod
RUN pnpm run build


FROM base_build
COPY --from=prod_build /strapi /strapi

WORKDIR /strapi

EXPOSE 1337
ENV NODE_ENV=production
ENV STRAPI_LOG_LEVEL=debug

CMD [ "pnpm", "start" ]