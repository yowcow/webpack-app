.PHONY: test

all:
	npm run gulp webpack

test:
	npm run gulp mocha
