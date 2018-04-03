'use strict';

describe('Component: PokemonComponent', function() {
  // load the controller's module
  beforeEach(module('tpPokemonsApp.pokemon'));

  var PokemonComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    PokemonComponent = $componentController('pokemon', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
