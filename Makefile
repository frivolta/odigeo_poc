build-dev:
	docker compose -f docker-compose.yml up --build

run-dev:
	docker compose -f docker-compose.yml up

.PHONY: build-dev, run-dev, build-production