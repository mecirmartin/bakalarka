import {
  DiagramModel,
  LinkModel,
  LinkModelGenerics,
  NodeModel,
} from "@projectstorm/react-diagrams";
import { BaseModel } from "@projectstorm/react-canvas-core";
import { Command } from "./components/command-manager/command";

export class CustomDiagramModel extends DiagramModel {
  removeLink(link: LinkModel<LinkModelGenerics>): void {
    const command = new Command(
      () => super.removeLink(link),
      () => super.addLink(link)
    );

    // @ts-ignore
    window.commandManager.addCommand(command);

    return super.removeLink(link);
  }

  addLink(link: LinkModel<LinkModelGenerics>): LinkModel<LinkModelGenerics> {
    const command = new Command(
      () => super.addLink(link),
      () => super.removeLink(link)
    );

    // @ts-ignore
    window.commandManager.addCommand(command);

    return super.addLink(link);
  }

  addNode(node: NodeModel): NodeModel {
    const command = new Command(
      () => super.addNode(node),
      () => super.removeNode(node)
    );

    // @ts-ignore
    window.commandManager.addCommand(command);

    return super.addNode(node);
  }

  removeNode(node: NodeModel): void {
    const command = new Command(
      () => super.removeNode(node),
      () => super.addNode(node)
    );

    // @ts-ignore
    window.commandManager.addCommand(command);

    return super.removeNode(node);
  }

  addAll(...models: BaseModel[]): BaseModel[] {
    return super.addAll(...models);
  }
}
