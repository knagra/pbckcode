CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode'] }, // shows the source button
		{ name: 'pbckcode' },                    // shows the pbckcode button
	];
	config.extraPlugins = 'pbckcode,onchange';
	config.pbckcode = {
		theme : "tomorrow_night",
		modes : [
		    ['CSS', 'css']
		],
		highlighter : "PRISM"
	};
};