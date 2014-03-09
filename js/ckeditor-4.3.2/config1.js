CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [

        { name: 'document', groups: [ 'mode'] },
		{ name: 'pbckcode' }
	];
	config.extraPlugins = 'pbckcode,onchange,sourcearea';
	config.allowedContent= 'pre[*]{*}(*)';
};