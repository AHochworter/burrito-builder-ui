describe('should fetch data and display main page elements', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'dummyOrders',
    })
      .as('getOrders')
      .visit('http://localhost:3000')
      .wait('@getOrders');
  });

  it('should display home page elements', () => {
    cy.get('h1').should('have.text', 'Burrito Builder');
    cy.get('form').should('exist');
    cy.get('section').should('have.length', 1);
    cy.get('section > :nth-child(1)').should('contain', 'Pat');
    cy.get('.order')
      .first()
      .find('.ingredient-list li')
      .first()
      .should('contain', 'beans');
    cy.get('.order')
      .first()
      .find('.ingredient-list li')
      .last()
      .should('contain', 'jalapeno');
    cy.get('section > :nth-child(3)').should('contain', 'Alex');
    cy.get('.order')
      .last()
      .find('.ingredient-list li')
      .first()
      .should('contain', 'sofritas');
    cy.get('.order')
      .last()
      .find('.ingredient-list li')
      .last()
      .should('contain', 'queso fresco');
  });

  it('should add an order to the list', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
      statusCode: 201,
      body: {
        id: 4,
        name: 'Johann',
        ingredients: ['steak', 'lettuce', 'sour cream'],
      },
    }).as('postOrder');
    cy.get("input[name='name']").type('Johann').should('have.value', 'Johann');
    cy.get('[name="steak"]').click();
    cy.get('.order').should('contain', 'steak');
    cy.get('[name="lettuce"]').click();
    cy.get('.order').should('contain', 'lettuce');
    cy.get('[name="sour cream"]').click();
    cy.get('.order').should('contain', 'sour cream');
    cy.get(':nth-child(15)').click();
    //add the wait here per Nick's request
    cy.wait('@postOrder');
    cy.get('.order').last().should('contain', 'Johann');
    cy.get('.order')
      .last()
      .find('.ingredient-list li')
      .first()
      .should('contain', 'steak');
    cy.get('.order')
      .last()
      .find('.ingredient-list li')
      .last()
      .should('contain', 'sour cream');
  });

  it('should not allow a user to submit an order if a name or one ingredient is not selected', () => {
    cy.get("input[name='name']").invoke('val', '');
    cy.get('button').contains('Submit Order').click();
    cy.get('p').should(
      'contain',
      'Please enter your name and select at least one ingredient'
    );
    cy.get("input[name='name']").type('John').should('have.value', 'John');
    cy.get('button').contains('Submit Order').click();
    cy.get('p').should(
      'contain',
      'Please enter your name and select at least one ingredient'
    );
    //empty name, empty ingredient, error
    cy.get("input[name='name']").invoke('val', '');
    cy.get('button').contains('Submit Order').click();
    cy.get('p').should(
      'contain',
      'Please enter your name and select at least one ingredient'
    );
  });
});
