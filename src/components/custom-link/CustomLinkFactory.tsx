import {
  DefaultLinkFactory,
  DefaultLinkModel,
  DefaultLinkWidget,
} from "@projectstorm/react-diagrams"

export class CustomLinkFactory extends DefaultLinkFactory {
  generateReactWidget(event): JSX.Element {
    return <DefaultLinkWidget link={event.model} diagramEngine={this.engine} />
  }

  generateModel(event) {
    return new DefaultLinkModel()
  }
}
