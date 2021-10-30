import * as SRD from "@projectstorm/react-diagrams"

import { EntityNodeFactory } from "./nodes/entity/EntityFactory"
import { EntityModel } from "./nodes/entity/EntityModel"
import { RelationshipNodeFactory } from "./nodes/relationship/RelationshipFactory"
import { AttributeNodeFactory } from "./nodes/attribute/AttributeFactory"
import { AdvancedLinkFactory } from "./links/custom-link/AdvancedLinkFactory"
import { AdvancedLinkModel } from "./links/custom-link/AdvancedLinkMode"

export class Application {
  protected activeModel: SRD.DiagramModel
  protected diagramEngine: SRD.DiagramEngine

  constructor() {
    this.activeModel = null
    this.diagramEngine = SRD.default()
    this.newModel()
    // Register factory
    const factoriesManager = this.diagramEngine.getNodeFactories()
    factoriesManager.registerFactory(new EntityNodeFactory())
    factoriesManager.registerFactory(new RelationshipNodeFactory())
    factoriesManager.registerFactory(new AttributeNodeFactory())

    this.diagramEngine
      .getLinkFactories()
      .registerFactory(new AdvancedLinkFactory())
    this.diagramEngine.getModel().getSelectedEntities()
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel()
    this.diagramEngine.setModel(this.activeModel)
    // this.activeModel.registerListener({
    //   selectionChanged: e => console.log("nodesUpdated", e),
    //   // linksUpdated: e => console.log("linksUpdated", e),
    // })

    // //3-A) create a default node
    // var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)")
    // let port = node1.addOutPort("Out")
    // node1.setPosition(100, 100)

    // //3-B) create another default node
    // var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)")
    // let port2 = node2.addInPort("In")
    // node2.setPosition(400, 100)
    //TODO
    // node1.setPosition(50, 50)

    // const link1 = new AdvancedLinkModel()
    // node1.getPort('left').addLink(node2.getPort('right'))
    // link1.setSourcePort(node1.getPort("out"))
    // link1.setTargetPort(node2.getPort("in"))

    // this.activeModel.addAll(node1)
  }

  public getActiveDiagram(): SRD.DiagramModel | null {
    return this.activeModel
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine
  }
}
