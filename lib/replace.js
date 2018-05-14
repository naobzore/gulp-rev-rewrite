'use strict';

const escapeRegExp = require('lodash.escaperegexp');

module.exports = function (string, manifest) {
	let newString = string;
	manifest.forEach(entry => {
		const {unreved, reved} = entry;

		const FRONT_DELIMITERS = ['"', '\'', '\\s', '(', '/', '='];
		const BACK_DELIMITERS = ['"', '\'', '\\s', ')', '\\\\', '?', '#'];

		const regexp = new RegExp(
			`([${FRONT_DELIMITERS.join('')}]|^)(${escapeRegExp(
				unreved
			)})([${BACK_DELIMITERS.join('')}]|$)`,
			'g'
		);

		newString = newString.replace(
			regexp,
			(match, frontDelimiter, unreved, backDelimiter) =>
				`${frontDelimiter}${reved}${backDelimiter}`
		);
	});
	return newString;
};