import * as SRD from "@projectstorm/react-diagrams";

import { EntityNodeFactory } from "./nodes/entity/EntityFactory";
import { RelationshipNodeFactory } from "./nodes/relationship/RelationshipFactory";
import { AttributeNodeFactory } from "./nodes/attribute/AttributeFactory";
import { AdvancedLinkFactory } from "./links/advancedlink/AdvancedLinkFactory";
import { TriangleNodeFactory } from "./nodes/generalization-category/TriangleNodeFactory";
import { States } from "./state/States";
import { DefaultDiagramState } from "@projectstorm/react-diagrams";
import { SimpleLinkFactory } from "./links/simplelink/SimpleLinkFactory";
import { EditableLabelFactory } from "./links/editable-label/EditableLabelFactory";
import Zoomaction from "./helpers/zoom";
import { CustomDiagramModel } from "./customModel";
import { CommandManager } from "./components/command-manager/commandManager";

export class Application {
  protected activeModel: SRD.DiagramModel;
  protected diagramEngine: SRD.DiagramEngine;

  constructor() {
    this.activeModel = null;
    this.diagramEngine = SRD.default({ registerDefaultZoomCanvasAction: false });
    this.newModel();
    this.diagramEngine.getActionEventBus().registerAction(new Zoomaction());
    this.diagramEngine.maxNumberPointsPerLink = 0;

    // Register factory
    const factoriesManager = this.diagramEngine.getNodeFactories();
    factoriesManager.registerFactory(new EntityNodeFactory());
    factoriesManager.registerFactory(new RelationshipNodeFactory());
    factoriesManager.registerFactory(new AttributeNodeFactory());
    factoriesManager.registerFactory(new TriangleNodeFactory());

    this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
    this.diagramEngine.getLinkFactories().registerFactory(new SimpleLinkFactory());
    this.diagramEngine.getLabelFactories().registerFactory(new EditableLabelFactory());
    this.diagramEngine.getStateMachine().pushState(new States());
    const state = this.diagramEngine.getStateMachine().getCurrentState();

    (state as DefaultDiagramState).dragNewLink.config.allowLooseLinks = false;
  }

  adjustGridOffset = ({ offsetX, offsetY }: any) => {
    document.body.style.setProperty("--offset-x", `${Math.round(offsetX)}px`);
    document.body.style.setProperty("--offset-y", `${Math.round(offsetY)}px`);
  };

  adjustGridZoom = ({ zoom }: any) => {
    const { gridSize } = this.activeModel.getOptions();
    document.body.style.setProperty("--grid-size", `${(gridSize * zoom) / 20}px`);
  };

  realignGrid = () => {
    this.adjustGridOffset({
      offsetX: this.activeModel.getOffsetX(),
      offsetY: this.activeModel.getOffsetY(),
    });

    this.adjustGridZoom({
      zoom: this.activeModel.getZoomLevel(),
    });
  };

  public newModel() {
    this.activeModel = new CustomDiagramModel();
    this.activeModel.setLocked(false);
    this.activeModel.setGridSize(1);
    this.activeModel.registerListener({
      eventDidFire: event => {
        const type = event.function;
        if (type === "offsetUpdated") this.adjustGridOffset(event);
        if (type === "zoomUpdated") this.adjustGridZoom(event);
      },
    });
    this.realignGrid();
    this.diagramEngine.setModel(this.activeModel);
    // Add command manager
    //@ts-ignore
    window.commandManager = new CommandManager();
    // Add command manager event listeners
    window.addEventListener("keydown", (event: any) => {
      console.log("ev", event);
      if (event.keyCode === 90 && (event.ctrlKey || event.metaKey) && !event.shiftKey) {
        // @ts-ignore
        window.commandManager.undo();
        this.diagramEngine.repaintCanvas();
      }

      if (event.keyCode === 90 && (event.ctrlKey || event.metaKey) && event.shiftKey) {
        // @ts-ignore
        window.commandManager.redo();
        this.diagramEngine.repaintCanvas();
      }
    });
  }

  public getActiveDiagram(): SRD.DiagramModel | null {
    return this.activeModel;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}
