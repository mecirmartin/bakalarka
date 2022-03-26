import { LabelModel } from "@projectstorm/react-diagrams"
import {
  BaseModelOptions,
  DeserializeEvent,
} from "@projectstorm/react-canvas-core"

export interface EditableLabelOptions extends BaseModelOptions {
  extras?: string
}

interface Extras {
  value: string
  type: "MULTIPLICITY" | "ROLE"
}

export class EditableLabelModel extends LabelModel {
  private extras: Extras

  constructor(labelState: Extras) {
    super({
      ...labelState,
      type: "editable-label",
    })
    this.extras = {
      value:
        labelState.value || labelState.type === "MULTIPLICITY"
          ? "1..n"
          : "Role",
      type: labelState.type,
    }
  }

  serialize() {
    return {
      ...super.serialize(),
      extras: this.extras,
    }
  }

  setState(extras: Extras) {
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
