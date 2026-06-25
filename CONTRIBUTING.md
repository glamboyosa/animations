# Contributing

Thanks for contributing to **animations**.

## Contributor License Agreement

By submitting a pull request to this project, you agree to license your contribution under the terms of the [MIT License](LICENSE).

You represent that you have the right to submit the work and that your contribution is your original work, or work you have permission to submit under these terms.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and navigate to the demo route you are working on (for example `/13`).

## Code quality

Before opening a pull request, run:

```bash
pnpm lint
pnpm build
```

CI runs Biome on `./src` for every pull request.

## Pull requests

Use the pull request template. Include:

- A clear **goal**
- **Screenshots** or a short screen recording for visual or animation changes
- **What changed and why**
- How you **verified** the change
- **Non-goals** — what you intentionally left out
- **LLM use disclosure** if applicable

Keep PRs focused. Prefer one demo or concern per pull request when possible.
