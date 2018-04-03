'use strict';

describe('Component: DeckComponent', function() {
  // load the controller's module
  beforeEach(module('tpPokemonsApp.deck'));

  var DeckComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    DeckComponent = $componentController('deck', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
