const URL = "http://192.168.1.5:8080/"

describe('Evaluando mi app', () => {
  beforeEach(() => {
    cy.visit(URL)
  });
  it('Se asegura que exista un formulario',()=>{
    cy.get(".contenedor-de-formulario").find("#formulario")
  })
  it('Verifica la existencia de los inputs', () => {
    cy.get('#cantidad-de-dinero').should("exist");
    cy.get('#selector-de-divisas').should("exist");
    cy.get('#fecha-inicial').should("exist");
    cy.get('#fecha-final').should("exist");
  });
  it('Se asegura que el input montos permita elegir un numero', ()=>{
    cy.get("#cantidad-de-dinero").type('2');
    cy.get('#cantidad-de-dinero').should(($input) => {
      expect($input.val()).to.not.be.empty
    })
  })
  it('Se asegura que el usuario pueda seleccionar la divisa de su elección', () => {
    cy.get('#selector-de-divisas').select('EUR');
    cy.get('#selector-de-divisas').should('have.value', 'EUR');
  });
  it('Se asegura que la fecha final se desbloquee después de ingresar una fecha inicial', () => {
    cy.get('#fecha-inicial').type('2022-01-01');
    cy.get('#fecha-inicial').trigger('change');
    cy.get('#fecha-final').should('not.be.disabled');
  });
  it('Se asegura que el boton convertir se desbloquee despues de ingresar las dos fechas',()=>{
    cy.get('#fecha-inicial').type('2022-01-01');
    cy.get('#fecha-inicial').trigger('change');
    cy.get('#fecha-final').type('2023-01-01');
    cy.get('#fecha-final').trigger('change');
    cy.get('#convertir').should('not.be.disabled');
  } )  
})

describe('Ingresar datos y verificar resultados',()=>{
  beforeEach(()=>{
    cy.visit(URL);
  });
  it('Completar el formulario de forma erronea',()=>{
    cy.get("#cantidad-de-dinero").type('-2');
    cy.get('#selector-de-divisas').select('EUR');
    cy.get('#fecha-inicial').type('2020-01-01');
    cy.get('#fecha-inicial').trigger('change');
    cy.get('#fecha-final').type('2024-01-01');
    cy.get('#fecha-final').trigger('change');
    cy.get('#convertir').click();
  })
})

describe('Ingresar datos y verificar resultados',()=>{
  beforeEach(()=>{
    cy.visit(URL);
  });
  it('Completar el formulario de forma erronea',()=>{
    cy.get("#cantidad-de-dinero").type('2');
    cy.get('#selector-de-divisas').select('EUR');
    cy.get('#fecha-inicial').type('2023-01-01');
    cy.get('#fecha-inicial').trigger('change');
    cy.get('#fecha-final').type('2023-02-01');
    cy.get('#fecha-final').trigger('change');
    cy.get('#convertir').click();
  })
})