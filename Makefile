.PHONY: build
build:
	$(call colorecho, "Building docker services...")
	docker-compose build

.PHONY: docker-no-logs
docker-no-logs:
	$(call colorecho, "Building and starting services...")
	docker-compose build && docker-compose up -d

.PHONY: docker
docker: docker-no-logs
	$(call colorecho, "Tailing logs...")
	docker-compose logs -f
