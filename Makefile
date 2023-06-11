format:
	prettier -w .

sync:
	npx svelte-kit sync

package: sync
	npx svelte-package
	npx publint

check: sync
	npx svelte-check --tsconfig ./jsconfig.json

.PHONY: dev build preview
dev:
	npx vite dev
preview:
	npx vite preview
build:
	npx vite build
	$(MAKE) package
