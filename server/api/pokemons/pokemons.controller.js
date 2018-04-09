/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pokemonss              ->  index
 * POST    /api/pokemonss              ->  create
 * GET     /api/pokemonss/:id          ->  show
 * PUT     /api/pokemonss/:id          ->  upsert
 * PATCH   /api/pokemonss/:id          ->  patch
 * DELETE  /api/pokemonss/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Pokemons from './pokemons.model';
const pokemon = require('pokemontcgsdk');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Pokemonss
export function index(req, res) {
  pokemon.card.where({ supertype: 'pokemon', page: 0, pageSize: 1000})
  .then(cards => {
    res.json(cards);
  });
}

// Gets a single Pokemons from the DB
export function show(req, res) {
  console.log("je suis dans le show");
  pokemon.card.find(req.params.id)
  .then(result => {
    console.log(result.card.id);
    res.json(result.card)
  })
  // pokemon.card.where({'id' : req.params.id})
  // .then(result => {
  //   console.log(result);
  //   res.json(result)
  // })
}

// Creates a new Pokemons in the DB
export function create(req, res) {
  return Pokemons.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Pokemons in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokemons.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Pokemons in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Pokemons.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Pokemons from the DB
export function destroy(req, res) {
  return Pokemons.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
