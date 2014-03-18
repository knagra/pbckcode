CKEDITOR.dialog.add('pbckcodeDialog', function (editor) {
    "use strict";

    // if there is no user settings
    // create an empty object
    if (editor.config.pbckcode === undefined) {
        editor.config.pbckcode = {};
    }

    // default settings object
    var DEFAULT_SETTINGS = {
        cls      : '',
        modes    : [
			['HTML', 'html'],
			['CSS', 'css'],
			['PHP', 'php'],
			['JS', 'javascript']
        ],
        theme    : 'textmate',
        tab_size : 4
    };

    var themes = [
        ['Light - chrome','chrome'],
        ['Light - clouds', 'clouds'],
        ['Light - crimson_editor','crimson_editor'],
        ['Light - dawn', 'dawn'],
        ['Light - dreamweaver', 'dreamweaver'],
        ['Light - eclipse', 'eclipse'],
        ['Light - github', 'github'],
        ['Light - solarized_light','solarized_light'],
        ['Light - textmate', 'textmate'],
        ['Light - tomorrow','tomorrow'],
        ['Light - xcode','xcode'],
        ['Light - kuroir','kuroir'],
        ['Light - katzenmilch','katzenmilch'],
        ['Dark - ambiance','ambiance'],
        ['Dark - chaos','chaos'],
        ['Dark - clouds_midnight','clouds_midnight'],
        ['Dark - cobalt','cobalt'],
        ['Dark - idle_fingers','idle_fingers'],
        ['Dark - kr_theme','kr_theme'],
        ['Dark - merbivore','merbivore'],
        ['Dark - merbivore_soft','merbivore_soft'],
        ['Dark - mono_industrial','mono_industrial'],
        ['Dark - monokai','monokai'],
        ['Dark - pastel_on_dark','pastel_on_dark'],
        ['Dark - solarized_dark','solarized_dark'],
        ['Dark - terminal','terminal'],
        ['Dark - tomorrow_night','tomorrow_night'],
        ['Dark - tomorrow_night_blue','tomorrow_night_blue'],
        ['Dark - tomorrow_night_bright','tomorrow_night_bright'],
        ['Dark - tomorrow_night_eighties','tomorrow_night_eighties'],
        ['Dark - twilight','twilight'],
        ['Dark - vibrant_ink','vibrant_ink']
    ];

    var tab_sizes = ["1", "2", "4", "8"];

    // merge user settings with default settings
    var settings = CKEDITOR.tools.extend(DEFAULT_SETTINGS, editor.config.pbckcode, true);

	// CKEditor variables
	var dialog, okButton;
    var shighlighter = new PBSyntaxHighlighter(settings.highlighter);

    // ACE variables
    var aceEditor, aceSession, whitespace;

    // EDITOR panel
    var editorPanel = {
        id       : 'editor',
        label    : editor.lang.pbckcode.editor,
        elements : [
            {
                type      : 'select',
                id        : 'code-select',
                label     : editor.lang.pbckcode.mode,
                items     : settings.modes,
                'default' : settings.modes[0][1],
                setup     : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcklang"));
                    }
                },
                commit    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcklang", this.getValue());
                    }
                },
                onChange  : function (element) {
                    aceSession.setMode("ace/mode/" + this.getValue());
                }
            },
            {
                type   : 'html',
                html   : '<div></div>',
                id     : 'code-textarea',
                style  : 'position: absolute; top: 80px; left: 10px; right: 10px; bottom: 50px;',
                setup  : function (element) {

                    // get the value of the editor
                    var code = element.getHtml();

                    // replace some regexp
                    code = code.replace(new RegExp('<br/>', 'g'), '\n');
                    code = code.replace(new RegExp('<br>', 'g'), '\n');
                    code = code.replace(new RegExp('&lt;', 'g'), '<');
                    code = code.replace(new RegExp('&gt;', 'g'), '>');
                    code = code.replace(new RegExp('&amp;', 'g'), '&');

                    aceEditor.setValue(code);
                },
                commit : function (element) {
                    element.setText(aceEditor.getValue());
                },
                onShow : function() {
                    setButtonState(okButton, aceEditor.getValue());
                }
            }
        ]
    };

    var settingsPanel = {
        id       : 'settings',
        label    : editor.lang.pbckcode.settings,
        elements : [
//            {
//                type      : 'select',
//                id        : 'code-select',
//                label     : 'Mode',
//                items     : settings.modes,
//                'default' : settings.modes[0][1],
//                setup     : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        this.setValue(element.getAttribute("data-pbcklang"));
//                    }
//                },
//                commit    : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        element.setAttribute("data-pbcklang", this.getValue());
//                    }
//                },
//                onChange  : function (element) {
//                    aceSession.setMode("ace/mode/" + this.getValue());
//                }
//            },
            {
                type      : 'select',
                id        : 'settings-tabsize',
                label     : editor.lang.pbckcode.tabSize,
                items     : tab_sizes,
                'default' : tab_sizes[2],
                                labelLayout : 'horizontal',

                setup     : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange  : function (element) {
                    if (element) {
                        whitespace.convertIndentation(aceSession, " ", this.getValue());
                        aceSession.setTabSize(this.getValue());
                    }
                }
            },
            {
                type      : 'select',
                id        : 'settings-theme',
                label     : editor.lang.pbckcode.theme,
                items     : themes,
                'default' : themes[2][1],
                labelLayout : 'horizontal',
                setup     : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // set into LocalStorage
                    }
                },
                commit    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                    }
                },
                onChange  : function (element) {
                    if (element) {
                        aceEditor.setTheme("ace/theme/" + this.getValue());
                    }
                }
            },
            {
                type      : 'checkbox',
                id        : 'settings-softtab',
                label     : editor.lang.pbckcode.softTab,
                checked   : true, //TODO get from LocalStorage
                                labelLayout : 'horizontal',

                setup     : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange  : function (element) {
                    if (element) {
                        aceSession.setUseSoftTabs(this.getValue());
                    }
                }
            },
            {
                type      : 'checkbox',
                id        : 'settings-emmet',
                label     : editor.lang.pbckcode.emmet,
                checked   : true, // TODO set from LocalStorage
                                labelLayout : 'horizontal',

                setup     : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange  : function (element) {
                    if (element) {
                        aceEditor.setOption("enableEmmet", this.getValue());
                    }
                }
            },
        ]
    };


    // dialog code
    return {
        // Basic properties of the dialog window: title, minimum size.
        title     : editor.lang.pbckcode.title,
        width  : 600,
        height : 400,
        resizable:      CKEDITOR.DIALOG_RESIZE_BOTH,
        // Dialog window contents definition.
        contents  : [
            editorPanel,
            settingsPanel
        ],
        onLoad    : function () {
			dialog = this;
			okButton = dialog.getButton('ok');

            // we load the ACE plugin to our div
            aceEditor = ace.edit(dialog.getContentElement('editor', 'code-textarea')
            	.getElement().getId());
            // save the aceEditor into the editor object for the resize event
            editor.aceEditor = aceEditor;

            // set default settings
            aceEditor.setTheme("ace/theme/" + settings.theme);
			aceEditor.setHighlightActiveLine(true);

            aceSession = aceEditor.getSession();
			aceSession.setMode("ace/mode/" + settings.modes[0][1]);
            aceSession.setTabSize(settings.tab_size);
			aceSession.setUseSoftTabs(true);

            // load ace extensions
            whitespace = ace.require('ace/ext/whitespace');

            aceEditor.on('change', function(e) {
                setButtonState(okButton, aceEditor.getValue());
            });
        },
        onShow    : function () {
            // get the selection
            var selection = editor.getSelection();
            // get the entire element
            var element = selection.getStartElement();

            // looking for the pre parent tag
            if (element) {
                element = element.getAscendant('pre', true);
            }
            // if there is no pre tag, it is an addition. Therefore, it is an edition
            if (!element || element.getName() !== 'pre') {
                element = new CKEDITOR.dom.element('pre');

                if (shighlighter.getTag() !== 'pre') {
                    element.append(new CKEDITOR.dom.element('code'));
                }
                this.insertMode = true;
            }
            else {
                if (shighlighter.getTag() !== 'pre') {
                    element = element.getChild(0);
                }
                this.insertMode = false;
            }
            // get the element to fill the inputs
            this.element = element;

            // we empty the editor
            aceEditor.setValue('');

            // we fill the inputs
            if (!this.insertMode) {
                this.setupContent(this.element);
            }
        },
        // This method is invoked once a user clicks the OK button, confirming the dialog.
        onOk      : function () {
            var pre, element;
            pre = element = this.element;

            if (this.insertMode) {
                if (shighlighter.getTag() !== 'pre') {
                    element = this.element.getChild(0);
                }
            }
            else {
                pre = element.getAscendant('pre', true);
            }

            this.commitContent(element);

            // set the full class to the code tag
            shighlighter.setCls(pre.getAttribute("data-pbcklang") + " " + settings.cls);

            element.setAttribute('class', shighlighter.getCls());

            // we add a new code tag into ckeditor editor
            if (this.insertMode) {
                editor.insertElement(pre);
            }
        }
    };
});

function setButtonState(button, value) {
    if(CKEDITOR.tools.isEmpty(value)) {
        button.disable();
    }
    else {
        button.enable();
    }
}

/*
 * Resize the ACE Editor
 */
CKEDITOR.dialog.on('resize', function (evt) {
    var AceEditor = evt.editor.aceEditor;
    if (AceEditor !== undefined) {
        AceEditor.resize();
    }
});

