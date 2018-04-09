'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './deck.routes';

export class DeckComponent {
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('tpPokemonsApp.deck', [uiRouter])
  .config(routes)
  .component('deck', {
    template: require('./deck.html'),
    controller: DeckComponent,
    controllerAs: 'deckCtrl'
  })
  .name;
