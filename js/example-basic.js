/* global $*/

CKEDITOR.replace('editor1', {
    customConfig : 'config1.js'
});

CKEDITOR.instances.editor1.on('change', function (e) {
    // append the result into the div
    $('#output1').html(e.editor.getData());
});