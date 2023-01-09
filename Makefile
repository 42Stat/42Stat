DOCKER_COMPOSE_DEV_DIR	:=	./dev/docker-compose.yml
DOCKER_COMPOSE_ENV_FILE := ./env/server/.env
DOCKER_COMPOSE					:=	docker-compose -f $(DOCKER_COMPOSE_DEV_DIR) --env-file=$(DOCKER_COMPOSE_ENV_FILE)

.PHONY: all
all:
	$(DOCKER_COMPOSE) up --build 

.PHONY: build up down
build up down:
	$(DOCKER_COMPOSE) $@

.PHONY: clean
clean:
	$(DOCKER_COMPOSE) down -v

.PHONY: prune
prune: clean
	yes | docker system prune -a
