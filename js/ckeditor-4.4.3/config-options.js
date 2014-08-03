CKEDITOR.editorConfig = function( config ) {
    config.toolbarGroups = [
		{ name: 'document', groups: [ 'mode'] }, // shows the source button
		{ name: 'pbckcode' }                     // shows the pbckcode button
	];
	config.extraPlugins = 'pbckcode,onchange,sourcearea';
    config.pbckcode = {
        highlighter : 'PRETTIFY',
        tab_size : '2',
        theme : 'tomorrow_night',
        modes :  [
            ['Java' , 'java'],
            ['Markdown' , 'markdown']
        ],
    };
};