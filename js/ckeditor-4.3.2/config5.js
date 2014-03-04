CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode'] },
		{ name: 'pbckcode' }
	];
	config.extraPlugins = 'pbckcode,onchange';
	config.pbckcode = {
		modes :  [ ['PHP', 'php'] ],
		theme : 'clouds_midnight',
		highlighter : "SYNTAX_HIGHLIGHTER"
	};
};