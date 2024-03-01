FROM node:18


WORKDIR /next
# following commands will run in /app

# separate out package json files for layer caching benefit
# COPY package*.json ./
# RUN ls -al

# RUN npm install

# COPY prisma ./prisma

# RUN npx prisma generate

COPY . .

RUN ls -al
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
# use CMD during run time