'use strict';
const angular = require('angular');
import ngResource from 'angular-resource';

/*@ngInject*/
export function deckService($resource) {
	'ngInject';
	return $resource('/api/deck', { id: '@_id'
		}, {
		update: {
			method: 'GET'
		}
	});
}

export default angular.module('tpPokemonsApp.deck', [ngResource])
  .service('deck', deckService)
  .name;
