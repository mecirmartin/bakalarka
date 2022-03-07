import {
  DefaultLinkModel,
  DefaultLinkWidget,
  DiagramEngine,
} from "@projectstorm/react-diagrams"

export class CustomLinkModel extends DefaultLinkModel {
  constructor(engine: DiagramEngine) {
    super()
    this.engine = engine
  }

  private engine: DiagramEngine

  generateReactWidget(event): JSX.Element {
    return <DefaultLinkWidget link={event.model} diagramEngine={this.engine} />
  }
}
