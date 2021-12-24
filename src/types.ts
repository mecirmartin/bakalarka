import { Application } from "./Application"

export interface BodyWidgetProps {
  app: Application
  ref: any
}

export interface EntityTrayState {
  isWeak: boolean
  value: string
}

export type RelationshipTrayState = EntityTrayState

export type AttributeType = "ATTRIBUTE" | "MULTIPLE_VALUE" | "DERIVED"
export type KeyType = "NONE" | "PRIMARY_KEY" | "PARTIAL_KEY"
export type LineTypeState =
  | "singleLine"
  | "multiLine"
  | "aggregation"
  | "composition"
  | "nonTransferableRelationship"

export interface AttributeTrayState {
  type: AttributeType
  key: KeyType
  value: string
}
