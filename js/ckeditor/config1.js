CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode'] }, // shows the source button
		{ name: 'pbckcode' } ,                    // shows the pbckcode button
	{ name: 'insert' }
	];
	config.extraPlugins = 'pbckcode,onchange,abbr';
};
