'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('deck', {
      url: '/deck',
      template: '<deck></deck>'
    });
}
