CKEditor.replace('ckeditor');

var editor = CKEditor.instances.ckeditor;
console.log(editor);
editor.onchange = function() {
	console.log('helloe');
}