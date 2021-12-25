import { DiagramEngine } from "@projectstorm/react-diagrams"

import { Command } from "./command"

export class CommandManager {
  stack: Array<Command> = []
  index: number = 0
  engine: DiagramEngine

  constructor(engine: DiagramEngine) {
    this.engine = engine
  }

  addCommand(command: Command) {
    // A change is made, so everything stored after the current point in the timeline should be erased.
    this.stack.length = this.index
    this.stack.push(command)
    this.index += 1
  }

  undo() {
    if (this.index > 0) {
      this.index--

      const command = this.stack[this.index]
      console.log("undo", this.index, this.stack)
      command.undo(this.engine)
    }
  }

  redo() {
    if (this.index <= this.stack.length - 1) {
      const command = this.stack[this.index]
      command.execute(this.engine)
      this.index++
    }
  }
}
