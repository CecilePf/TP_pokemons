'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './pokemon.routes';

export class PokemonComponent {
  pokemons_liste = [];

  constructor($scope, pokemons, Auth) {
    'ngInject';
    this.pokemons = pokemons;
    this.$scope = $scope;
    var user = Auth.getCurrentUserSync();
    console.log(user._id);
    sessionStorage.setItem("userid",user._id);
    console.log(sessionStorage);
  }

  $onInit() {
    this.pokemons.query().$promise.then(data => this.pokemons_liste = data);
    this.liste = true;
    this.details = false;
  }

  showInfos(pokemon) {
    console.log(pokemon);
    this.liste = false;
    this.details = true;
    this.infos = pokemon;
  }

  addCollection(pokemon) {
    console.log(pokemon);
  }
}

export default angular.module('tpPokemonsApp.pokemon', [uiRouter])
  .config(routes)
  .component('pokemon', {
    template: require('./pokemon.html'),
    controller: PokemonComponent,
    controllerAs: 'pokemonCtrl'
  })
  .name;
