.PHONY: docker
docker:
	$(call colorecho, "Building and starting services...")
	docker-compose build && docker-compose up -d && docker-compose logs -f