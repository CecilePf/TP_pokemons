'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('profil', {
      url: '/pokemon/:id',
      template: '<profil></profil>'
    });
}
