import {
  State,
  Action,
  InputType,
  ActionEvent,
  SelectionBoxState,
} from "@projectstorm/react-canvas-core";

export class CustomSelectingState extends State {
  constructor() {
    super({
      name: "selecting",
    });
    //use 'control' keys instead of 'shift'
    this.keys = ["shift"];
    // determine what was clicked on
    this.registerAction(
      new Action({
        type: InputType.MOUSE_DOWN,
        fire: (event: ActionEvent<any>) => {
          const element = this.engine.getActionEventBus().getModelForEvent(event);
          // go into a selection box on the canvas state
          if (!element) {
            this.transitionWithEvent(new SelectionBoxState(), event);
          } else {
            element.setSelected(!element.isSelected());
            this.engine.repaintCanvas();
          }
        },
      })
    );
  }
}
