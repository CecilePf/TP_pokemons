'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDeck;

describe('Deck API:', function() {
  describe('GET /api/decks', function() {
    var decks;

    beforeEach(function(done) {
      request(app)
        .get('/api/decks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          decks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      decks.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/decks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/decks')
        .send({
          name: 'New Deck',
          info: 'This is the brand new deck!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDeck = res.body;
          done();
        });
    });

    it('should respond with the newly created deck', function() {
      newDeck.name.should.equal('New Deck');
      newDeck.info.should.equal('This is the brand new deck!!!');
    });
  });

  describe('GET /api/decks/:id', function() {
    var deck;

    beforeEach(function(done) {
      request(app)
        .get(`/api/decks/${newDeck._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          deck = res.body;
          done();
        });
    });

    afterEach(function() {
      deck = {};
    });

    it('should respond with the requested deck', function() {
      deck.name.should.equal('New Deck');
      deck.info.should.equal('This is the brand new deck!!!');
    });
  });

  describe('PUT /api/decks/:id', function() {
    var updatedDeck;

    beforeEach(function(done) {
      request(app)
        .put(`/api/decks/${newDeck._id}`)
        .send({
          name: 'Updated Deck',
          info: 'This is the updated deck!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDeck = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDeck = {};
    });

    it('should respond with the updated deck', function() {
      updatedDeck.name.should.equal('Updated Deck');
      updatedDeck.info.should.equal('This is the updated deck!!!');
    });

    it('should respond with the updated deck on a subsequent GET', function(done) {
      request(app)
        .get(`/api/decks/${newDeck._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let deck = res.body;

          deck.name.should.equal('Updated Deck');
          deck.info.should.equal('This is the updated deck!!!');

          done();
        });
    });
  });

  describe('PATCH /api/decks/:id', function() {
    var patchedDeck;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/decks/${newDeck._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Deck' },
          { op: 'replace', path: '/info', value: 'This is the patched deck!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDeck = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDeck = {};
    });

    it('should respond with the patched deck', function() {
      patchedDeck.name.should.equal('Patched Deck');
      patchedDeck.info.should.equal('This is the patched deck!!!');
    });
  });

  describe('DELETE /api/decks/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/decks/${newDeck._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when deck does not exist', function(done) {
      request(app)
        .delete(`/api/decks/${newDeck._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
