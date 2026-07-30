# Loquix documentation

The public documentation site for [Loquix](https://github.com/loquix-dev/loquix), a Web Component library for AI and LLM chat interfaces.

Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Local development

```sh
pnpm install
pnpm dev
```

The site will be available at `http://localhost:4321`.

## Writing documentation

Documentation pages live in `src/content/docs` and are written in Markdown or MDX. Component demos use the shared `LivePreview` Astro component, so examples render the real `@loquix/core` package.

Each component page should include:

- a short purpose statement;
- an interactive preview;
- installation/import and usage examples;
- properties, events, slots, CSS parts, and CSS custom properties;
- accessibility or usage notes where relevant.

## Checks

```sh
pnpm validate
```

The release check validates Astro and TypeScript, verifies internal links, and builds the static production site.

## Contributing

Fixes and improvements are welcome. Open a pull request with focused changes and include a screenshot when the visual output changes.
