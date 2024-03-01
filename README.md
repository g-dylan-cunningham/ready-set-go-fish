# INITIAL SETUP

# DOCKER
## open interactive shell
# docker exec -it rsgf-db-container psql -U postgres

## run prisma initial migration in docker container
# docker exec -it rsgf-express-container npx prisma migrate dev --name init



# DOCKER DB, E0 EXPRESS
docker compose up -d (without express or next in compose file)
prisma generate
prisma migrate dev --name init
prisma db seed

