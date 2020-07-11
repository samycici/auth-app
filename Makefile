bootstrap: down kill up

build:
	docker-compose up

pre-push:
	@npm run standard && make test

test:
	docker-compose up tests

PHONY: build pre-push test
