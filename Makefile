# Generate new library
expo-lib:
	@if [ -z "$(name)" ]; then \
		echo "Usage: make expo-lib name=<package-name>"; \
		echo "Example: make expo-lib name=rnc-fab"; \
		exit 1; \
	fi
	bunx nx g @nx/expo:lib libs/$(name) $(name) --importPath=$(name)
	@echo "Applying templates..."
	@if [ -f "tools/templates/package.json.template" ]; then \
		sed 's/{{PACKAGE_NAME}}/$(name)/g' tools/templates/package.json.template > libs/$(name)/package.json; \
		echo "✅ Applied package.json template for $(name)"; \
	else \
		echo "⚠️  Warning: tools/templates/package.json.template not found, using default"; \
	fi
	@if [ -f "tools/templates/tsconfig.lib.json.template" ]; then \
		cp tools/templates/tsconfig.lib.json.template libs/$(name)/tsconfig.lib.json; \
		echo "✅ Applied tsconfig.lib.json template for $(name)"; \
	else \
		echo "⚠️  Warning: tools/templates/tsconfig.lib.json.template not found, using default"; \
	fi

# Build all libraries
build-all:
	bunx nx run-many --target=build --all

# Start example app
start:
	bunx nx start example

# Clean and start
start-clean:
	bun run nx reset && bun start --clear

# Show help
help:
	@echo "Available commands:"
	@echo "  make expo-lib name=<package-name>  - Generate new library with templates"
	@echo "  make build-all                         - Build all libraries"
	@echo "  make start                             - Start example app"
	@echo "  make start-clean                       - Clean and start app"
	@echo "  make help                              - Show this help"

.PHONY: expo-lib build-all start start-clean help