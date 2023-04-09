build-dev:
	docker compose -f docker-compose.yml up --build

run-dev:
	docker compose -f docker-compose.yml up

build-production:
    npm run build

.PHONY: build-dev, run-dev, build-production