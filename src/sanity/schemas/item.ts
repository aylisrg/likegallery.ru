import { defineType, defineField } from 'sanity'

const CATEGORIES = [
  'Буддизм',
  'Христианство',
  'Индия/Гималаи',
  'Китай/Тибет',
  'Монголия/Дзанабазар',
  'Современники',
  'Артефакты Востока',
]

export const item = defineType({
  name: 'item',
  title: 'Предмет',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Название',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL (slug)',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Категория',
      options: {
        list: CATEGORIES.map((c) => ({ title: c, value: c })),
        layout: 'dropdown',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Статус',
      options: {
        list: [
          { title: 'В наличии', value: 'active' },
          { title: 'Продано', value: 'sold' },
          { title: 'На реставрации', value: 'restoration' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Фотографии',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt текст (описание для поисковиков)',
            }),
          ],
        },
      ],
      validation: (r) => r.min(1).error('Добавьте хотя бы одну фотографию'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Описание / Провенанс',
      rows: 5,
    }),
    defineField({
      name: 'price',
      type: 'string',
      title: 'Цена (напр. «150 000 ₽» или «По запросу»)',
    }),
    defineField({
      name: 'expertisePdf',
      type: 'file',
      title: 'PDF экспертизы (опционально)',
      options: { accept: '.pdf' },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'images.0' },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        active: '✅ В наличии',
        sold: '🔴 Продано',
        restoration: '🔧 На реставрации',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle, media }
    },
  },
})
