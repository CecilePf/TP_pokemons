'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('pokemon', {
      url: '/pokemon',
      template: '<pokemon></pokemon>'
    });
}
