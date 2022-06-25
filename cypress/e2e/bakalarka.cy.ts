describe("bakalarka", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("visits page", () => {
    cy.visit("http://localhost:3000");
  });

  it("creates-entity", () => {
    cy.get('[data-cy="entity-widget"]').first().should("be.visible");
    cy.get('[data-cy="entity-widget"]').first().click();
    cy.get("#demoContainer").click();
    cy.get('[data-cy="entity"]').should("be.visible");
  });
  it("creates-relationship", () => {
    cy.get('[data-cy="entity-widget"]').last().should("be.visible");
    cy.get('[data-cy="entity-widget"]').last().click();
    cy.get("#demoContainer").click();
    cy.get('[data-cy="relationship"]').should("be.visible");
  });
  it("creates-attribute", () => {
    cy.get('[data-cy="attribute-widget"]').should("be.visible");
    cy.get('[data-cy="attribute-widget"]').first().click("topRight");
    cy.get("#demoContainer").click();
    cy.get('[data-cy="attribute"]').should("be.visible");
  });
  it("creates-generalization", () => {
    cy.get('[data-cy="generalization-widget"]').should("be.visible");
    cy.get('[data-cy="generalization-widget"]').first().click();
    cy.get("#demoContainer").click();
    cy.get('[data-cy="generalization"]').should("be.visible");
  });
});

export {};
