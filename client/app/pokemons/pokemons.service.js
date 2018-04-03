'use strict';
const angular = require('angular');
import ngResource from 'angular-resource';

/*@ngInject*/
export function pokemonsService($resource) {
	'ngInject';
	return $resource('https://api.pokemontcg.io/v1/cards', { id: '@_id'
		}, {
		update: {
			method: 'PUT'
		}
	});
}

export default angular.module('tpPokemonsApp.pokemons', [ngResource])
.service('pokemons', pokemonsService)
.name;
