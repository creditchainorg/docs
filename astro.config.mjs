// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.creditchain.org',
	integrations: [
		starlight({
			title: 'CreditChain Docs',
			description: 'Build on, run and validate the CreditChain network.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/creditchainorg/docs' }],
			editLink: { baseUrl: 'https://github.com/creditchainorg/docs/edit/main/' },
			lastUpdated: true,
			sidebar: [
				{ label: 'Networks', items: [{ autogenerate: { directory: 'networks' } }] },
				{ label: 'Run a node', items: [{ autogenerate: { directory: 'nodes' } }] },
				{ label: 'Validators', items: [{ autogenerate: { directory: 'validators' } }] },
				{ label: 'Developers', items: [{ autogenerate: { directory: 'developers' } }] },
				{ label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
			],
		}),
	],
});
