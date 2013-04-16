jQuery(function($){
	prettyPrint();

	CKEDITOR.replace('editor1', {
		customConfig: 'config1.js'
	});

	// checks each change of the Editor
	CKEDITOR.instances.editor1.on('change', function(e) {
		// gets the value of the editor
		output = e.editor.getData();

		// append the result into the div
		$('.output').html(output);
		// relaunch the prettify code
		prettyPrint();
	});
});