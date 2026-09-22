// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://loquix.dev',
	base: '/docs',
	integrations: [
		starlight({
			title: 'Loquix',
			description: 'Web Components for production-ready AI chat interfaces.',
			favicon: '/favicon.svg',
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
			},
			locales: {
				root: { label: 'English', lang: 'en' },
			},
			lastUpdated: true,
			credits: true,
			social: [
				{ icon: 'open-book', label: 'Storybook', href: 'https://loquix.dev/storybook/' },
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
						content: 'https://loquix.dev/docs/og.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						name: 'twitter:image',
						content: 'https://loquix.dev/docs/og.png',
					},
				},
			],
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'Overview', slug: 'index' },
						{ label: 'Quick start', slug: 'quick-start', badge: { text: 'Start here', variant: 'success' } },
						{ label: 'Installation', slug: 'installation' },
						{ label: 'Component catalog', slug: 'components', badge: 'v0.4.1' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Theming', slug: 'guides/theming' },
						{ label: 'Events and state', slug: 'guides/events-and-state' },
						{ label: 'Accessibility', slug: 'guides/accessibility' },
						{ label: 'Browser support', slug: 'guides/browser-support' },
					],
				},
				{
					label: 'Component reference',
					items: [
						{ label: 'Chat Container', slug: 'components/chat-container' },
						{ label: 'Chat Header', slug: 'components/chat-header' },
						{ label: 'Chat Composer', slug: 'components/chat-composer' },
						{ label: 'Prompt Input', slug: 'components/prompt-input' },
						{ label: 'Composer Toolbar', slug: 'components/composer-toolbar' },
						{ label: 'Drop Zone', slug: 'components/drop-zone' },
						{ label: 'Attachment Chip', slug: 'components/attachment-chip' },
						{ label: 'Message List', slug: 'components/message-list' },
						{ label: 'Message Item', slug: 'components/message-item' },
						{ label: 'Message Content', slug: 'components/message-content' },
						{ label: 'Message Avatar', slug: 'components/message-avatar' },
						{ label: 'Message Actions', slug: 'components/message-actions' },
						{ label: 'Action Button', slug: 'components/action-button' },
						{ label: 'Action Copy', slug: 'components/action-copy' },
						{ label: 'Action Edit', slug: 'components/action-edit' },
						{ label: 'Action Feedback', slug: 'components/action-feedback' },
						{ label: 'Message Attachments', slug: 'components/message-attachments' },
						{ label: 'Typing Indicator', slug: 'components/typing-indicator' },
						{ label: 'Generation Controls', slug: 'components/generation-controls' },
						{ label: 'Reasoning Block', slug: 'components/reasoning-block' },
						{ label: 'Tool Call', slug: 'components/tool-call' },
						{ label: 'Tool Call List', slug: 'components/tool-call-list' },
						{ label: 'Citation Popover', slug: 'components/citation-popover' },
						{ label: 'Source List', slug: 'components/source-list' },
						{ label: 'Confidence Indicator', slug: 'components/confidence-indicator' },
						{ label: 'Uncertainty Marker', slug: 'components/uncertainty-marker' },
						{ label: 'Disclosure Badge', slug: 'components/disclosure-badge' },
						{ label: 'Caveat Notice', slug: 'components/caveat-notice' },
						{ label: 'Disagreement Marker', slug: 'components/disagreement-marker' },
						{ label: 'Search Input', slug: 'components/search-input' },
						{ label: 'Search Sources', slug: 'components/search-sources' },
						{ label: 'Search Result', slug: 'components/search-result' },
						{ label: 'Search Results', slug: 'components/search-results' },
						{ label: 'Search Answer', slug: 'components/search-answer' },
						{ label: 'Search Footer', slug: 'components/search-footer' },
						{ label: 'Search Panel', slug: 'components/search-panel' },
						{ label: 'Search Dialog', slug: 'components/search-dialog' },
						{ label: 'Welcome Screen', slug: 'components/welcome-screen' },
						{ label: 'Suggestion Chips', slug: 'components/suggestion-chips' },
						{ label: 'Follow-up Suggestions', slug: 'components/follow-up-suggestions' },
						{ label: 'Mode Selector', slug: 'components/mode-selector' },
						{ label: 'Model Selector', slug: 'components/model-selector' },
					],
				},
				{
					label: 'Resources',
					items: [
						{ label: 'Contributing to docs', slug: 'contributing' },
						{
							label: 'Storybook',
							link: 'https://loquix.dev/storybook/',
							attrs: { target: '_blank', rel: 'noopener' },
						},
						{
							label: 'Loquix on GitHub',
							link: 'https://github.com/loquix-dev/loquix',
							attrs: { target: '_blank', rel: 'noopener' },
						},
						{
							label: 'Package on npm',
							link: 'https://www.npmjs.com/package/@loquix/core',
							attrs: { target: '_blank', rel: 'noopener' },
						},
					],
				},
			],
		}),
	],
});
