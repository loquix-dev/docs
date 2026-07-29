// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.loquix.dev',
	integrations: [
		starlight({
			title: 'Loquix',
			description: 'Web Components for production-ready AI chat interfaces.',
			favicon: '/og.png',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/loquix-dev/loquix' },
			],
			editLink: {
				baseUrl: 'https://github.com/loquix-dev/docs/edit/main/',
			},
			customCss: [
				'./src/styles/custom.css',
			],
			head: [
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#5b43e6' } },
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://docs.loquix.dev/og.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://docs.loquix.dev/og.png',
					},
				},
			],
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'Overview', slug: 'index' },
						{ label: 'Installation', slug: 'installation' },
					],
				},
				{
					label: 'Components',
					items: [
						{ label: 'Chat Container', slug: 'components/chat-container' },
						{ label: 'Chat Header', slug: 'components/chat-header' },
						{ label: 'Chat Composer', slug: 'components/chat-composer' },
						{ label: 'Prompt Input', slug: 'components/prompt-input' },
						{ label: 'Message Item', slug: 'components/message-item' },
						{ label: 'Typing Indicator', slug: 'components/typing-indicator' },
						{ label: 'Reasoning Block', slug: 'components/reasoning-block' },
						{ label: 'Suggestion Chips', slug: 'components/suggestion-chips' },
						{ label: 'Model Selector', slug: 'components/model-selector' },
					],
				},
			],
		}),
	],
});
