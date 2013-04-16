/**
 * @license Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'tools' },
		{ name: 'styles' },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
	    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },	
		{ name: 'links' },
		{ name: 'others' },
	];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
	config.language = 'en';
	config.extraPlugins = 'pbckcode';
	config.pbckcode  = {
		'mode' : [ ['PHP', 'php'], ['HTML', 'html'], ['CSS', 'css'] ],
	};
}; 
