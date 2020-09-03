FROM node:14-alpine

WORKDIR /app

# Installing dependencies
COPY yarn.lock ./
RUN yarn

# Copying source files
COPY . .

# Building app
# RUN yarn build

# Running the app
CMD [ "yarn", "dev" ]