import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  constructor() {
    // 'ngInject';
    // Auth.getCurrentUserSync().$promise.then(function(res) {
    //   sessionStorage.setItem("userid", res._id);
    //   var userid = sessionStorage.getItem("userid");
    //   console.log(userid);
    // });
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
    controller: MainController
  })
  .name;
