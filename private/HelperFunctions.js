module.exports = {
	//Strips html from strings
	stripHTML: function(dirtyString) {
		return dirtyString.replace(/<(?:.|\n)*?>/gm, '');
	}
}