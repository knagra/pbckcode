jQuery(function($){
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
        $('#output1').html(e.editor.getData());

        // relaunch the prettify code
        prettyPrint();
    });

    // PRETTIFY
    CKEDITOR.instances.editor2.on('change', function(e) {
        // append the result into the div
        $('#output2').html(e.editor.getData());

        // relaunch the prettify code
        prettyPrint();
    });

    // PRISM
    CKEDITOR.instances.editor3.on('change', function(e) {
        // append the result into the div
        $('#output3').html(e.editor.getData());

        Prism.highlightElement($('#output3').find('code'), false);
    });

    // HIGHLIGHT
    CKEDITOR.instances.editor4.on('change', function(e) {
        // append the result into the div
        $('#output4').html(e.editor.getData());

        $('#output4').find('code').each(function(i, e) {hljs.highlightBlock(e); });
    });

    // SYNTAX_HIGHLIGHTER
    CKEDITOR.instances.editor5.on('change', function(e) {
        // append the result into the div
        $('.output').html(e.editor.getData());

        SyntaxHighlighter.highlight();
    });
});