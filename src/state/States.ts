import {
  State,
  Action,
  InputType,
  DragCanvasState,
  MoveItemsState,
  SelectingState,
} from "@projectstorm/react-canvas-core"
import { DragNewLinkState } from "@projectstorm/react-diagrams"
import {
  PortModel,
  LinkModel,
  PointModel,
} from "@projectstorm/react-diagrams-core"
import { AdvancedLinkModel } from "../links/advancedlink/AdvancedLinkModel"

import SelectLinkState from "./SelectLinkState"

/**
 * This class defines custom handlers (called states) to respond to
 * clicking events on certain elements.
 */
export class States extends State {
  constructor() {
    super({
      name: "diagram-states",
    })

    // You can grab the default state from `react-diagrams` for every one of these...
    this.childStates = [new SelectingState()]
    this.dragCanvas = new DragCanvasState()
    this.dragNewLink = new DragNewLinkState()
    this.dragItems = new MoveItemsState()

    // But this is a custom one!
    this.selectLink = new SelectLinkState()

    // Determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: event => {
          const element = this.engine
            .getActionEventBus()
            //@ts-ignore
            .getModelForEvent(event)
          console.log("mouse down")

          // The canvas was clicked on, transition to the dragging canvas state
          if (!element) {
            console.log("A")

            this.transitionWithEvent(this.dragCanvas, event)
          }
          // Initiate dragging a new link
          else if (element instanceof PortModel) {
            console.log("B")

            this.transitionWithEvent(this.dragNewLink, event)
          }
          // Link selection <============================================
          else if (element instanceof LinkModel) {
            console.log("link select", event)
            this.transitionWithEvent(this.selectLink, event)
          }
          // Move items
          else {
            this.transitionWithEvent(this.dragItems, event)
          }
        },
      })
    )
  }
  dragCanvas: any
  dragNewLink: any
  selectLink: any
  dragItems: any
}
