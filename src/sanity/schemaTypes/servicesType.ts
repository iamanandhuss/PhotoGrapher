import {defineField, defineType} from 'sanity'

export const servicesType = defineType({
  name: 'services',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Skill Name', type: 'string'},
            {name: 'percent', title: 'Percentage', type: 'number'},
          ],
        },
      ],
    }),
    defineField({
      name: 'backImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'frontImage',
      title: 'Foreground Image (Video Cover)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
