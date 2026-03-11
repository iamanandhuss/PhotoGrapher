import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './projectType'
import { heroType } from './heroType'
import { servicesType } from './servicesType'
import { testimonialType } from './testimonialType'
import { aboutType } from './aboutType'
import { ctaType } from './ctaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, heroType, servicesType, testimonialType, aboutType, ctaType],
}
