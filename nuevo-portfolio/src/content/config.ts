import { defineCollection, z } from 'astro:content';

const artworksCollection = defineCollection({
    type: 'data',
    schema: z.object({
        id: z.string(),
        title: z.object({
            es: z.string(),
            en: z.string(),
        }),
        technique: z.object({
            es: z.string(),
            en: z.string(),
        }),
        image: z.string(),
        year: z.string(),
        dimensions: z.string(),
        status: z.enum(['available', 'sold', 'reserved']),
        description: z.object({
            es: z.string(),
            en: z.string(),
        }),
    }),
});

export const collections = {
    'artworks': artworksCollection,
};
