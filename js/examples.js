prettyPrint();

// DEFAULT CONFIGURATION
CKEDITOR.replace('editor1', {
    customConfig: 'config1.js'
});

// PRETTIFY
CKEDITOR.replace('editor2', {
    customConfig: 'config2.js'
});

// PRISM
CKEDITOR.replace('editor3', {
    customConfig: 'config3.js'
});

// HIGHLIGHT
CKEDITOR.replace('editor4', {
    customConfig: 'config4.js'
});

// SYNTAX_HIGHLIGHTER
CKEDITOR.replace('editor5', {
    customConfig: 'config5.js'
});


/***************************************/
// this part is for demo purpose only
/***************************************/

// DEFAULT CONFIGURATION
CKEDITOR.instances.editor1.on('change', function(e) {
    // append the result into the div
    document.getElementById('output1').innerHTML = e.editor.getData();
});

// PRETTIFY
CKEDITOR.instances.editor2.on('change', function(e) {
    // append the result into the div
    document.getElementById('output2').innerHTML = e.editor.getData();

    prettyPrint(null, document.getElementById('output2'));
});

// PRISM
CKEDITOR.instances.editor3.on('change', function(e) {
    // append the result into the div
    document.getElementById('output3').innerHTML = e.editor.getData();

    Prism.highlightAll();
});

// HIGHLIGHT
CKEDITOR.instances.editor4.on('change', function(e) {
    // append the result into the div
    document.getElementById('output4').innerHTML = e.editor.getData();

    var output4 = document.getElementById('output4');

    if(output4) {
       var pre = output4.children[0];
        if(pre) {
            var code = pre.children[0];
            if(code) {
                hljs.highlightBlock(code);
            }
        }
    }
});

// SYNTAX_HIGHLIGHTER
CKEDITOR.instances.editor5.on('change', function(e) {
    // append the result into the div
    document.getElementById('output5').innerHTML = e.editor.getData();

    SyntaxHighlighter.highlight();
});