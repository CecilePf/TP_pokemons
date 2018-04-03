'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var pokemonsCtrlStub = {
  index: 'pokemonsCtrl.index',
  show: 'pokemonsCtrl.show',
  create: 'pokemonsCtrl.create',
  upsert: 'pokemonsCtrl.upsert',
  patch: 'pokemonsCtrl.patch',
  destroy: 'pokemonsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pokemonsIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pokemons.controller': pokemonsCtrlStub
});

describe('Pokemons API Router:', function() {
  it('should return an express router instance', function() {
    pokemonsIndex.should.equal(routerStub);
  });

  describe('GET /api/pokemonss', function() {
    it('should route to pokemons.controller.index', function() {
      routerStub.get
        .withArgs('/', 'pokemonsCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/pokemonss/:id', function() {
    it('should route to pokemons.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'pokemonsCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/pokemonss', function() {
    it('should route to pokemons.controller.create', function() {
      routerStub.post
        .withArgs('/', 'pokemonsCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/pokemonss/:id', function() {
    it('should route to pokemons.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'pokemonsCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pokemonss/:id', function() {
    it('should route to pokemons.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'pokemonsCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pokemonss/:id', function() {
    it('should route to pokemons.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'pokemonsCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
