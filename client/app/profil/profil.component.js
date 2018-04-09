'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './profil.routes';

export class ProfilComponent {

  constructor(pokemons, $stateParams) {
    'ngInject';
    this.pokemons = pokemons;
    this.stateParams = $stateParams;
  }

  $onInit() {
    console.log(this.stateParams.id);
    this.pokemons.get({id : this.stateParams.id}).$promise.then(data => this.pokemon = data);
  }
}

export default angular.module('tpPokemonsApp.profil', [uiRouter])
  .config(routes)
  .component('profil', {
    template: require('./profil.html'),
    controller: ProfilComponent,
    controllerAs: 'profilCtrl'
  })
  .name;
