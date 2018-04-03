'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './pokemons.events';

var PokemonsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(PokemonsSchema);
export default mongoose.model('Pokemons', PokemonsSchema);
