.PHONY: dev build typecheck deploy

dev:
	npm run dev

build:
	npm run build

typecheck:
	npm run typecheck

deploy:
	npm run build
	git add .
	git diff-index --quiet HEAD || git commit -m "Deploy website update"
	git push
