import { LabelModel } from "@projectstorm/react-diagrams"
import {
  BaseModelOptions,
  DeserializeEvent,
} from "@projectstorm/react-canvas-core"

export interface EditableLabelOptions extends BaseModelOptions {
  extras?: string
}

export class EditableLabelModel extends LabelModel {
  private extras: string

  constructor(labelState: { value: string }) {
    super({
      ...labelState,
      type: "editable-label",
    })
    this.extras = labelState.value || "Role"
  }

  serialize() {
    return {
      ...super.serialize(),
      extras: this.extras,
    }
  }

  setState(extras: string) {
    this.extras = extras
  }

  getState() {
    return this.extras
  }

  deserialize(event: DeserializeEvent<this>): void {
    super.deserialize(event)
    this.extras = event.data.extras
  }
}
