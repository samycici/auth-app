bootstrap: down kill up

build:
	docker-compose build

build-server:
	docker-compose up

pre-push:
	@npm run standard && make test

sonar:
	docker run -ti -v $(shell pwd):/usr/src newtmitch/sonar-scanner -Dsonar.projectBaseDir=/usr/src -Dsonar.branch.name=${BRANCH} -Dsonar.host.url=${URL} -Dsonar.login=${KEY}

test:
	docker-compose up tests

PHONY: build build-server pre-push sonar test
