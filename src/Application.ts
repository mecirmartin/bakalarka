import * as SRD from "@projectstorm/react-diagrams"

import { EntityTypeNodeFactory } from "./nodes/entity-type/EntityTypeFactory"
import { WeakEntityTypeNodeFactory } from "./nodes/weak-entity-type/WeakEntityTypeFactory"
import { EntityTypeModel } from "./nodes/entity-type/EntityTypeModel"
import { RelationshipTypeNodeFactory } from "./nodes/relationship-type/RelationshipTypeFactory"
import { IdentificationRelationshipTypeNodeFactory } from "./nodes/identification-relationship-type/IdentificationRelationshipTypeFactory"
import { AttributeNodeFactory } from "./nodes/attribute/AttributeFactory"
import { MultipleValueAttributeNodeFactory } from "./nodes/multiple-value-attribute/MultipleValueAttributeFactory"
import { DerivedAttributeNodeFactory } from "./nodes/derived-attribute/DerivedAttributeFactory"

export class Application {
  protected activeModel: SRD.DiagramModel
  protected diagramEngine: SRD.DiagramEngine

  constructor() {
    this.activeModel = null
    this.diagramEngine = SRD.default()
    this.newModel()
    // Register factory
    const factoriesManager = this.diagramEngine.getNodeFactories()
    factoriesManager.registerFactory(new EntityTypeNodeFactory())
    factoriesManager.registerFactory(new WeakEntityTypeNodeFactory())
    factoriesManager.registerFactory(new RelationshipTypeNodeFactory())
    factoriesManager.registerFactory(
      new IdentificationRelationshipTypeNodeFactory()
    )
    factoriesManager.registerFactory(new AttributeNodeFactory())
    factoriesManager.registerFactory(new MultipleValueAttributeNodeFactory())
    factoriesManager.registerFactory(new DerivedAttributeNodeFactory())
  }

  public newModel() {
    this.activeModel = new SRD.DiagramModel()
    this.diagramEngine.setModel(this.activeModel)

    // //3-A) create a default node
    // var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)")
    // let port = node1.addOutPort("Out")
    // node1.setPosition(100, 100)

    // //3-B) create another default node
    // var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)")
    // let port2 = node2.addInPort("In")
    // node2.setPosition(400, 100)
    const node1 = new EntityTypeModel()
    node1.setPosition(50, 50)

    // const link1 = new DefaultLinkModel()
    // link1.setSourcePort(node1.getPort("out"))
    // link1.setTargetPort(node2.getPort("in"))

    this.activeModel.addAll(node1)
  }

  public getActiveDiagram(): SRD.DiagramModel | null {
    return this.activeModel
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine
  }
}
