'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var deckCtrlStub = {
  index: 'deckCtrl.index',
  show: 'deckCtrl.show',
  create: 'deckCtrl.create',
  upsert: 'deckCtrl.upsert',
  patch: 'deckCtrl.patch',
  destroy: 'deckCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var deckIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './deck.controller': deckCtrlStub
});

describe('Deck API Router:', function() {
  it('should return an express router instance', function() {
    deckIndex.should.equal(routerStub);
  });

  describe('GET /api/decks', function() {
    it('should route to deck.controller.index', function() {
      routerStub.get
        .withArgs('/', 'deckCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/decks/:id', function() {
    it('should route to deck.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'deckCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/decks', function() {
    it('should route to deck.controller.create', function() {
      routerStub.post
        .withArgs('/', 'deckCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/decks/:id', function() {
    it('should route to deck.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'deckCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/decks/:id', function() {
    it('should route to deck.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'deckCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/decks/:id', function() {
    it('should route to deck.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'deckCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
