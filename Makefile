bootstrap: down kill up

build:
	docker-compose build

build-server:
	docker-compose up server db

mutation:
	docker-compose up mutation

pre-push:
	@npm run standard && make test

test:
	docker-compose up tests

PHONY: build build-server pre-push test
