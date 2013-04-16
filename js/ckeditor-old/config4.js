CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode'] }, // shows the source button
		{ name: 'pbckcode' }                     // shows the pbckcode button
	];
	config.extraPlugins = 'pbckcode,onchange';
	config.pbckcode = {
		modes :  [ ["Java" , "java"], ["Markdown" , "markdown"] ],
		highlighter : "HIGHLIGHT"
	};
};