export const ENTITY = ['task', 'project'] as const

export type entityTypes = (typeof ENTITY)[number]
