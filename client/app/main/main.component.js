import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  pokemons_liste = [];

  /*@ngInject*/
  constructor($scope, pokemons) {
    'ngInject';
    this.pokemons = pokemons;
    this.$scope = $scope;
  }

  $onInit() {
    this.pokemons.get().$promise.then(data => this.pokemons_liste = data);
  }

  // addThing() {
  //   if(this.newThing) {
  //     this.$http.post('/api/things', {
  //       name: this.newThing
  //     });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete(`/api/things/${thing._id}`);
  // }
}

export default angular.module('tpPokemonsApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'PokCtrl'
  })
  .name;
