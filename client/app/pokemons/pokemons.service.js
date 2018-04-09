'use strict';
const angular = require('angular');
import ngResource from 'angular-resource';

/*@ngInject*/
export function pokemonsService($resource) {
	'ngInject';
	return $resource('/api/pokemonss/:id', { id: '@id'
		}, {
            update: {
                method: 'PUT'
            }
	});
}

export default angular.module('tpPokemonsApp.pokemons', [ngResource])
.service('pokemons', pokemonsService)
.name;
