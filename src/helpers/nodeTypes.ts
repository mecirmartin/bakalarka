export const ENTITY = "ENTITY"
export const RELATIONSHIP = "RELATIONSHIP"
export const ATTRIBUTE = "ATTRIBUTE"
export const GENERALIZATION_CATEGORY = "GENERALIZATION_CATEGORY"

export type DiagramNodeType =
  | typeof ENTITY
  | typeof RELATIONSHIP
  | typeof ATTRIBUTE
  | typeof GENERALIZATION_CATEGORY
