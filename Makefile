.PHONY: build
build:
	$(call colorecho, "Building docker services...")
	docker-compose build

.PHONY: docker
docker:
	$(call colorecho, "Building and starting services...")
	docker-compose build && docker-compose up -d && docker-compose logs -f