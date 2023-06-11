publish:
	pnpm publish

format:
	prettier -w .

sync:
	npx svelte-kit sync

build.package: sync
	npx svelte-package
	npx publint

check: sync
	npx svelte-check --tsconfig ./jsconfig.json

.PHONY: dev build.demo preview
dev:
	npx vite dev
preview:
	npx vite preview
build.demo:
	$(MAKE) build.package
	npx vite build
