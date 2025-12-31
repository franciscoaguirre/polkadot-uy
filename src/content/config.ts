import { defineCollection, z } from 'astro:content';

const newsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		author: z.string(),
		image: z.object({
			url: z.string(),
			alt: z.string(),
		}).optional(),
		tags: z.array(z.string()).default([]),
		lang: z.enum(['es', 'en']),
		draft: z.boolean().default(false),
		featured: z.boolean().default(false),
		relatedArticle: z.string().optional(), // Slug of the translation
	}),
});

const pagesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		lang: z.enum(['es', 'en']),
	}),
});

export const collections = {
	'news': newsCollection,
	'pages': pagesCollection,
};
