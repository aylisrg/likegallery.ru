import { defineType, defineField } from 'sanity'

export const serviceCase = defineType({
  name: 'serviceCase',
  title: 'Кейс услуги',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Название кейса',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Тип услуги',
      options: {
        list: [
          { title: 'Реставрация', value: 'restoration' },
          { title: 'Экспертиза', value: 'expertise' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageBefore',
      type: 'image',
      title: 'Фото ДО',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageAfter',
      type: 'image',
      title: 'Фото ПОСЛЕ',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Описание (что было сделано)',
      rows: 4,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'imageBefore' },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        restoration: '🔧 Реставрация',
        expertise: '📋 Экспертиза',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle, media }
    },
  },
})
