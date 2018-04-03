'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './deck.events';

var DeckSchema = new mongoose.Schema({
  user_id: String,
  pokemon_id: String
});

registerEvents(DeckSchema);
export default mongoose.model('Deck', DeckSchema);
