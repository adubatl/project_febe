.PHONY: build up down logs clean test

# Build all Docker images
build:
	docker-compose build

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# View logs of all services
logs:
	docker-compose logs -f

# Remove all Docker artifacts
clean:
	docker-compose down -v --rmi all --remove-orphans

# Run tests (you'll need to implement these in your services)
test:
	docker-compose run --rm be yarn test
	docker-compose run --rm fe yarn test
	docker-compose run --rm application yarn test

# Install dependencies for all services
install:
	cd be && yarn install
	cd fe && yarn install
	cd application && yarn install

# Start development servers
dev:
	docker-compose up

# Build for production
prod-build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build

# Run in production mode
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Show Docker container status
status:
	docker-compose ps

# Enter a shell in a running container
shell:
	@read -p "Enter service name (be/fe/application): " service; \
	docker-compose exec $$service sh

# Generate TypeScript types (assuming you have a script for this)
generate-types:
	cd be && yarn generate-types
	cd fe && yarn generate-types
	cd application && yarn generate-types

# Start the application independently
start-application:
	cd application && yarn start