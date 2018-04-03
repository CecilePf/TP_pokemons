'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPokemons;

describe('Pokemons API:', function() {
  describe('GET /api/pokemonss', function() {
    var pokemonss;

    beforeEach(function(done) {
      request(app)
        .get('/api/pokemonss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokemonss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      pokemonss.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/pokemonss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pokemonss')
        .send({
          name: 'New Pokemons',
          info: 'This is the brand new pokemons!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPokemons = res.body;
          done();
        });
    });

    it('should respond with the newly created pokemons', function() {
      newPokemons.name.should.equal('New Pokemons');
      newPokemons.info.should.equal('This is the brand new pokemons!!!');
    });
  });

  describe('GET /api/pokemonss/:id', function() {
    var pokemons;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pokemonss/${newPokemons._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pokemons = res.body;
          done();
        });
    });

    afterEach(function() {
      pokemons = {};
    });

    it('should respond with the requested pokemons', function() {
      pokemons.name.should.equal('New Pokemons');
      pokemons.info.should.equal('This is the brand new pokemons!!!');
    });
  });

  describe('PUT /api/pokemonss/:id', function() {
    var updatedPokemons;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pokemonss/${newPokemons._id}`)
        .send({
          name: 'Updated Pokemons',
          info: 'This is the updated pokemons!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPokemons = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPokemons = {};
    });

    it('should respond with the updated pokemons', function() {
      updatedPokemons.name.should.equal('Updated Pokemons');
      updatedPokemons.info.should.equal('This is the updated pokemons!!!');
    });

    it('should respond with the updated pokemons on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pokemonss/${newPokemons._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pokemons = res.body;

          pokemons.name.should.equal('Updated Pokemons');
          pokemons.info.should.equal('This is the updated pokemons!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pokemonss/:id', function() {
    var patchedPokemons;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pokemonss/${newPokemons._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Pokemons' },
          { op: 'replace', path: '/info', value: 'This is the patched pokemons!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPokemons = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPokemons = {};
    });

    it('should respond with the patched pokemons', function() {
      patchedPokemons.name.should.equal('Patched Pokemons');
      patchedPokemons.info.should.equal('This is the patched pokemons!!!');
    });
  });

  describe('DELETE /api/pokemonss/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pokemonss/${newPokemons._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pokemons does not exist', function(done) {
      request(app)
        .delete(`/api/pokemonss/${newPokemons._id}`)
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
