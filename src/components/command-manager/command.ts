import { DiagramEngine } from "@projectstorm/react-diagrams"

export class Command {
  _execute: Function
  _undo: Function

  constructor(execute: Function, undo: Function) {
    this._execute = execute
    this._undo = undo
  }

  execute(engine: DiagramEngine) {
    this._execute(engine)
  }

  undo(engine: DiagramEngine) {
    this._undo(engine)
  }
}
