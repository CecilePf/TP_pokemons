/**
 * Deck model events
 */

'use strict';

import {EventEmitter} from 'events';
var DeckEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DeckEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Deck) {
  for(var e in events) {
    let event = events[e];
    Deck.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    DeckEvents.emit(event + ':' + doc._id, doc);
    DeckEvents.emit(event, doc);
  };
}

export {registerEvents};
export default DeckEvents;
