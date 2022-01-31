install:
	install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npm test -- --coverage --coverageProvider=v8