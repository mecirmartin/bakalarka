import * as SRD from "@projectstorm/react-diagrams"

import { EntityNodeFactory } from "./nodes/entity/EntityFactory"
import { RelationshipNodeFactory } from "./nodes/relationship/RelationshipFactory"
import { AttributeNodeFactory } from "./nodes/attribute/AttributeFactory"
import { AdvancedLinkFactory } from "./links/advancedlink/AdvancedLinkFactory"
import { TriangleNodeFactory } from "./nodes/generalization-category/TriangleNodeFactory"
import { States } from "./state/States"
import { DefaultDiagramState } from "@projectstorm/react-diagrams"
import { SimpleLinkFactory } from "./links/simplelink/SimpleLinkFactory"
import { EditableLabelFactory } from "./links/editable-label/EditableLabelFactory"
import Zoomaction from "./helpers/zoom"

export class Application {
  protected activeModel: SRD.DiagramModel
  protected diagramEngine: SRD.DiagramEngine

  constructor() {
    this.activeModel = null
    this.diagramEngine = SRD.default({ registerDefaultZoomCanvasAction: false })
    this.newModel()
    this.diagramEngine.getActionEventBus().registerAction(new Zoomaction())
    this.diagramEngine.maxNumberPointsPerLink = 0

    // Register factory
    const factoriesManager = this.diagramEngine.getNodeFactories()
    factoriesManager.registerFactory(new EntityNodeFactory())
    factoriesManager.registerFactory(new RelationshipNodeFactory())
    factoriesManager.registerFactory(new AttributeNodeFactory())
    factoriesManager.registerFactory(new TriangleNodeFactory())

    this.diagramEngine
      .getLinkFactories()
      .registerFactory(new AdvancedLinkFactory())
    this.diagramEngine
      .getLinkFactories()
      .registerFactory(new SimpleLinkFactory())
    this.diagramEngine
      .getLabelFactories()
      .registerFactory(new EditableLabelFactory())
    // this.diagramEngine.getStateMachine().pushState(new States())
    const state = this.diagramEngine.getStateMachine().getCurrentState()

    ;(state as DefaultDiagramState).dragNewLink.config.allowLooseLinks = false
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel()
    this.diagramEngine.setModel(this.activeModel)
  }

  public getActiveDiagram(): SRD.DiagramModel | null {
    return this.activeModel
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine
  }
}
