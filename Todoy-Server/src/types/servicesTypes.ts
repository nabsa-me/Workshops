const ENTITY = ['task', 'project'] as const
export type entityTypes = (typeof ENTITY)[number]

const SERVICE = ['tasks', 'projects', 'stripe'] as const
export type serviceTypes = (typeof SERVICE)[number]
