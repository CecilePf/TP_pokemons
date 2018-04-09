'use strict';

describe('Component: ProfilComponent', function() {
  // load the controller's module
  beforeEach(module('tpPokemonsApp.profil'));

  var ProfilComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ProfilComponent = $componentController('profil', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
