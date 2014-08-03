/* global $, Prism*/

CKEDITOR.replace('editor1', {
    customConfig : 'config-custom.js'
});

// SYNTAX_HIGHLIGHTER
CKEDITOR.instances.editor1.on('change', function (e) {
    // append the result into the div
    $('#output5').html(e.editor.getData());

    Prism.highlightAll();
});