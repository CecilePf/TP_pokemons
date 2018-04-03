/**
 * Pokemons model events
 */

'use strict';

import {EventEmitter} from 'events';
var PokemonsEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PokemonsEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Pokemons) {
  for(var e in events) {
    let event = events[e];
    Pokemons.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    PokemonsEvents.emit(event + ':' + doc._id, doc);
    PokemonsEvents.emit(event, doc);
  };
}

export {registerEvents};
export default PokemonsEvents;
