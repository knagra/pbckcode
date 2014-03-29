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
        ['Light - chrome', 'chrome'],
        ['Light - clouds', 'clouds'],
        ['Light - crimson_editor', 'crimson_editor'],
        ['Light - dawn', 'dawn'],
        ['Light - dreamweaver', 'dreamweaver'],
        ['Light - eclipse', 'eclipse'],
        ['Light - github', 'github'],
        ['Light - solarized_light', 'solarized_light'],
        ['Light - textmate', 'textmate'],
        ['Light - tomorrow', 'tomorrow'],
        ['Light - xcode', 'xcode'],
        ['Light - kuroir', 'kuroir'],
        ['Light - katzenmilch', 'katzenmilch'],
        ['Dark - ambiance', 'ambiance'],
        ['Dark - chaos', 'chaos'],
        ['Dark - clouds_midnight', 'clouds_midnight'],
        ['Dark - cobalt', 'cobalt'],
        ['Dark - idle_fingers', 'idle_fingers'],
        ['Dark - kr_theme', 'kr_theme'],
        ['Dark - merbivore', 'merbivore'],
        ['Dark - merbivore_soft', 'merbivore_soft'],
        ['Dark - mono_industrial', 'mono_industrial'],
        ['Dark - monokai', 'monokai'],
        ['Dark - pastel_on_dark', 'pastel_on_dark'],
        ['Dark - solarized_dark', 'solarized_dark'],
        ['Dark - terminal', 'terminal'],
        ['Dark - tomorrow_night', 'tomorrow_night'],
        ['Dark - tomorrow_night_blue', 'tomorrow_night_blue'],
        ['Dark - tomorrow_night_bright', 'tomorrow_night_bright'],
        ['Dark - tomorrow_night_eighties', 'tomorrow_night_eighties'],
        ['Dark - twilight', 'twilight'],
        ['Dark - vibrant_ink', 'vibrant_ink']
    ];
    var shortcuts = [
        {
            pc     : "Ctrl+",
            mac    : "Command+",
            action : "Show the settings menu"
        },
        {
            pc     : "Ctrl+Alt+Up",
            mac    : "Ctrl+Option+Up",
            action : "Add multi-cursor above"
        },
        {
            pc     : "Ctrl+Alt+Down",
            mac    : "Ctrl+Option+Down",
            action : "Add multi-cursor below"
        },
        {
            pc     : "Ctrl+Alt+Right",
            mac    : "Ctrl+Option+Right",
            action : "Add next occurrence to multi-selection"
        },
        {
            pc     : "Ctrl+Alt+Left",
            mac    : "Ctrl+Option+Left",
            action : "Add previous occurrence to multi-selection"
        },
        {
            pc     : "",
            mac    : "Ctrl+L",
            action : "Center selection"
        },
        {
            pc     : "Ctrl+Shift+U",
            mac    : "Ctrl+Shift+U",
            action : "Change to lower case"
        },
        {
            pc     : "Ctrl+U",
            mac    : "Ctrl+U",
            action : "Change to upper case"
        },
        {
            pc     : "Alt+Shift+Down",
            mac    : "Command+Option+Down",
            action : "Copy lines down"
        },
        {
            pc     : "Alt+Shift+Up",
            mac    : "Command+Option+Up",
            action : "Copy lines up"
        },
        {
            pc     : "Delete",
            mac    : "",
            action : "Delete"
        },
        {
            pc     : "Ctrl+Shift+D",
            mac    : "Command+Shift+D",
            action : "Duplicate selection"
        },
        {
            pc     : "Ctrl+F",
            mac    : "Command+F",
            action : "Find"
        },
        {
            pc     : "Ctrl+K",
            mac    : "Command+G",
            action : "Find next"
        },
        {
            pc     : "Ctrl+Shift+K",
            mac    : "Command+Shift+G",
            action : "Find previous"
        },
        {
            pc     : "Alt+0",
            mac    : "Command+Option+0",
            action : "Fold all"
        },
        {
            pc     : "Alt+L, Ctrl+F1",
            mac    : "Command+Option+L, Command+F1",
            action : "Fold selection"
        },
        {
            pc     : "Down",
            mac    : "Down, Ctrl+N",
            action : "Go line down"
        },
        {
            pc     : "Up",
            mac    : "Up, Ctrl+P",
            action : "Go line up"
        },
        {
            pc     : "Ctrl+End",
            mac    : "Command+End, Command+Down",
            action : "Go to end"
        },
        {
            pc     : "Left",
            mac    : "Left, Ctrl+B",
            action : "Go to left"
        },
        {
            pc     : "Ctrl+L",
            mac    : "Command+L",
            action : "Go to line"
        },
        {
            pc     : "Alt+Right, End",
            mac    : "Command+Right, End, Ctrl+E",
            action : "Go to line end"
        },
        {
            pc     : "Alt+Left, Home",
            mac    : "Command+Left, Home, Ctrl+A",
            action : "Go to line start"
        },
        {
            pc     : "Ctrl+P",
            mac    : "",
            action : "Go to matching bracket"
        },
        {
            pc     : "PageDown",
            mac    : "Option+PageDown, Ctrl+V",
            action : "Go to page down"
        },
        {
            pc     : "PageUp",
            mac    : "Option+PageUp",
            action : "Go to page up"
        },
        {
            pc     : "Right",
            mac    : "Right, Ctrl+F",
            action : "Go to right"
        },
        {
            pc     : "Ctrl+Home",
            mac    : "Command+Home, Command+Up",
            action : "Go to start"
        },
        {
            pc     : "Ctrl+Left",
            mac    : "Option+Left",
            action : "Go to word left"
        },
        {
            pc     : "Ctrl+Right",
            mac    : "Option+Right",
            action : "Go to word right"
        },
        {
            pc     : "Tab",
            mac    : "Tab",
            action : "Indent"
        },
        {
            pc     : "Ctrl+Alt+E",
            mac    : "",
            action : "Macros recording"
        },
        {
            pc     : "Ctrl+Shift+E",
            mac    : "Command+Shift+E",
            action : "Macros replay"
        },
        {
            pc     : "Alt+Down",
            mac    : "Option+Down",
            action : "Move lines down"
        },
        {
            pc     : "Alt+Up",
            mac    : "Option+Up",
            action : "Move lines up"
        },
        {
            pc     : "Ctrl+Alt+Shift+Up",
            mac    : "Ctrl+Option+Shift+Up",
            action : "Move multicursor from current line to the line above"
        },
        {
            pc     : "Ctrl+Alt+Shift+Down",
            mac    : "Ctrl+Option+Shift+Down",
            action : "Move multicursor from current line to the line below"
        },
        {
            pc     : "Shift+Tab",
            mac    : "Shift+Tab",
            action : "Outdent"
        },
        {
            pc     : "Insert",
            mac    : "Insert",
            action : "Overwrite"
        },
        {
            pc     : "Ctrl+Shift+Z, Ctrl+Y",
            mac    : "Command+Shift+Z, Command+Y",
            action : "Redo"
        },
        {
            pc     : "Ctrl+Alt+Shift+Right",
            mac    : "Ctrl+Option+Shift+Right",
            action : "Remove current occurrence from multi-selection and move to next"
        },
        {
            pc     : "Ctrl+Alt+Shift+Left",
            mac    : "Ctrl+Option+Shift+Left",
            action : "Remove current occurrence from multi-selection and move to previous"
        },
        {
            pc     : "Ctrl+D",
            mac    : "Command+D",
            action : "Remove line"
        },
        {
            pc     : "Alt+Delete",
            mac    : "Ctrl+K",
            action : "Remove to line end"
        },
        {
            pc     : "Alt+Backspace",
            mac    : "Command+Backspace",
            action : "Remove to linestart"
        },
        {
            pc     : "Ctrl+Backspace",
            mac    : "Option+Backspace, Ctrl+Option+Backspace",
            action : "Remove word left"
        },
        {
            pc     : "Ctrl+Delete",
            mac    : "Option+Delete",
            action : "Remove word right"
        },
        {
            pc     : "Ctrl+R",
            mac    : "Command+Option+F",
            action : "Replace"
        },
        {
            pc     : "Ctrl+Shift+R",
            mac    : "Command+Shift+Option+F",
            action : "Replace all"
        },
        {
            pc     : "Ctrl+Down",
            mac    : "Command+Down",
            action : "Scroll line down"
        },
        {
            pc     : "Ctrl+Up",
            mac    : "",
            action : "Scroll line up"
        },
        {
            pc     : "",
            mac    : "Option+PageDown",
            action : "Scroll page down"
        },
        {
            pc     : "",
            mac    : "Option+PageUp",
            action : "Scroll page up"
        },
        {
            pc     : "Ctrl+A",
            mac    : "Command+A",
            action : "Select all"
        },
        {
            pc     : "Ctrl+Shift+L",
            mac    : "Ctrl+Shift+L",
            action : "Select all from multi-selection"
        },
        {
            pc     : "Shift+Down",
            mac    : "Shift+Down",
            action : "Select down"
        },
        {
            pc     : "Shift+Left",
            mac    : "Shift+Left",
            action : "Select left"
        },
        {
            pc     : "Shift+End",
            mac    : "Shift+End",
            action : "Select line end"
        },
        {
            pc     : "Shift+Home",
            mac    : "Shift+Home",
            action : "Select line start"
        },
        {
            pc     : "Shift+PageDown",
            mac    : "Shift+PageDown",
            action : "Select page down"
        },
        {
            pc     : "Shift+PageUp",
            mac    : "Shift+PageUp",
            action : "Select page up"
        },
        {
            pc     : "Shift+Right",
            mac    : "Shift+Right",
            action : "Select right"
        },
        {
            pc     : "Ctrl+Shift+End",
            mac    : "Command+Shift+Down",
            action : "Select to end"
        },
        {
            pc     : "Alt+Shift+Right",
            mac    : "Command+Shift+Right",
            action : "Select to line end"
        },
        {
            pc     : "Alt+Shift+Left",
            mac    : "Command+Shift+Left",
            action : "Select to line start"
        },
        {
            pc     : "Ctrl+Shift+P",
            mac    : "",
            action : "Select to matching bracket"
        },
        {
            pc     : "Ctrl+Shift+Home",
            mac    : "Command+Shift+Up",
            action : "Select to start"
        },
        {
            pc     : "Shift+Up",
            mac    : "Shift+Up",
            action : "Select up"
        },
        {
            pc     : "Ctrl+Shift+Left",
            mac    : "Option+Shift+Left",
            action : "Select word left"
        },
        {
            pc     : "Ctrl+Shift+Right",
            mac    : "Option+Shift+Right",
            action : "Select word right"
        },
        {
            pc     : "",
            mac    : "Ctrl+O",
            action : "Split line"
        },
        {
            pc     : "Ctrl+/",
            mac    : "Command+/",
            action : "Toggle comment"
        },
        {
            pc     : "Ctrl+T",
            mac    : "Ctrl+T",
            action : "Transpose letters"
        },
        {
            pc     : "Ctrl+Z",
            mac    : "Command+Z",
            action : "Undo"
        },
        {
            pc     : "Alt+Shift+L, Ctrl+Shift+F1",
            mac    : "Command+Option+Shift+L, Command+Shift+F1",
            action : "Unfold"
        },
        {
            pc     : "Alt+Shift+0",
            mac    : "Command+Option+Shift+0",
            action : "Unfold all"
        },
        {
            pc     : "Ctrl+Enter",
            mac    : "Command+Enter",
            action : "Enter full screen"
        }
    ];
    var font_sizes = [
        ["10px", 10],
        ["11px", 11],
        ["12px", 12],
        ["13px", 13],
        ["14px", 14],
        ["16px", 16],
        ["18px", 18],
        ["20px", 20],
        ["24px", 24]
    ];
    var tab_sizes = [
        ["1"],
        ["2"],
        ["4"],
        ["8"]
    ];

    // merge user settings with default settings
    var settings = CKEDITOR.tools.extend(DEFAULT_SETTINGS, editor.config.pbckcode, true);

    // CKEditor variables
    var dialog, okButton;
    var shighlighter = new PBSyntaxHighlighter(settings.highlighter);
    var lang = editor.lang.pbckcode;

    // ACE variables
    var aceEditor, aceSession, whitespace;

    // EDITOR panel
    var editorPanel = {
        id       : 'editor',
        label    : lang.panels.editor,
        elements : [
            {
                type      : 'select',
                id        : 'code-select',
                label     : lang.settings.mode,
                items     : settings.modes,
                'default' : settings.modes[0][1],
                style     : 'width: 150px',
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
                style  : 'position: absolute; top: 117px; left: 10px; right: 10px; bottom: 50px;',
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
                onShow : function () {
                    setButtonState(okButton, aceEditor.getValue());
                }
            }
        ]
    };

    var settingsPanel = {
        id       : 'settings',
        label    : lang.panels.settings,
        elements : [
            {
                type      : 'select',
                id        : 'settings-tabsize',
                label     : lang.settings.tabSize,
                items     : tab_sizes,
                'default' : tab_sizes[2],
                style     : 'width: 80px;',
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
                    whitespace.convertIndentation(aceSession, " ", this.getValue());
                    aceSession.setTabSize(this.getValue());
                }
            },
            {
                type      : 'select',
                id        : 'settings-theme',
                label     : lang.settings.theme,
                items     : themes,
                'default' : themes[2][1],
//                setup     : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        this.setValue(element.getAttribute("data-pbcktabsize"));
//                        // set into LocalStorage
//                    }
//                },
//                commit    : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        element.setAttribute("data-pbcktabsize", this.getValue());
//                    }
//                },
                onChange  : function (element) {
                    aceEditor.setTheme("ace/theme/" + this.getValue());
                }
            },
            {
                type      : 'select',
                id        : 'settings-fontSize',
                label     : lang.settings.fontSize,
                items     : font_sizes,
                'default' : font_sizes[2][1],
                style     : 'width: 80px;',

//                setup       : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        this.setValue(element.getAttribute("data-pbcktabsize"));
//                        // set into LocalStorage
//                    }
//                },
//                commit      : function (element) {
//                    if (element) {
//                        element = element.getAscendant('pre', true);
//                        element.setAttribute("data-pbcktabsize", this.getValue());
//                    }
//                },
                onChange  : function (element) {
                    aceEditor.setFontSize(this.getValue());
                }
            },
            {
                type     : 'checkbox',
                id       : 'settings-softTab',
                label    : lang.settings.softTab,
                checked  : true, //TODO get from LocalStorage
                setup    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit   : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange : function (element) {
                    if (element) {
                        aceSession.setUseSoftTabs(this.getValue());
                    }
                }
            },
            {
                type     : 'checkbox',
                id       : 'settings-emmet',
                label    : lang.settings.emmet,
                checked  : true, // TODO set from LocalStorage
                setup    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit   : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange : function (element) {
                    if (element) {
                        aceEditor.setOption("enableEmmet", this.getValue());
                    }
                }
            },
            {
                type     : 'checkbox',
                id       : 'settings-showInvisible',
                label    : lang.settings.showInvisible,
                checked  : true, //TODO get from LocalStorage
                setup    : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        this.setValue(element.getAttribute("data-pbcktabsize"));
                        // get from LocalStorage
                    }
                },
                commit   : function (element) {
                    if (element) {
                        element = element.getAscendant('pre', true);
                        element.setAttribute("data-pbcktabsize", this.getValue());
                        // set into LocalStorage
                    }
                },
                onChange : function (element) {
                    if (element) {
                        aceSession.setUseSoftTabs(this.getValue());
                    }
                }
            }
        ]
    };

    var shortcutsString = '';
    var isMac = navigator.appVersion.indexOf("Mac") != -1;
    for (var i = 0; i < shortcuts.length; i++) {
        shortcutsString += '<tr>';
        shortcutsString += '<td>';
        shortcutsString += shortcuts[i].action;
        shortcutsString += '</td>';
        shortcutsString += '<td>';
        shortcutsString += isMac ? shortcuts[i].mac : shortcuts[i].pc;
        shortcutsString += '</td>';
        shortcutsString += '</tr>';
    }

    // SHORTCUTS panel
    var shortcutsPanel = {
        id       : 'shortcuts',
        label    : lang.panels.shortcuts,
        elements : [
            {
                type   : 'html',
                html   : '<div class="table-container clearfix">' +
                    '<table class="table table-bordered table-striped table-hover"><tr>' +
                    '<th>' + lang.shortcuts.action + '</th>' +
                    '<th>' + lang.shortcuts.shortcut + '</th></tr>' +
                    shortcutsString + '</table></div>',
                onShow : function () {
                    document.documentElement.className = "dialog-open";
                },
                onHide : function () {
                    document.documentElement.className = "";
                }
            }
        ]
    };

    // dialog code
    return {
        // Basic properties of the dialog window: title, minimum size.
        title     : lang.title,
        width     : 600,
        height    : 400,
        resizable : CKEDITOR.DIALOG_RESIZE_BOTH,
        // Dialog window contents definition.
        contents  : [
            editorPanel,
            settingsPanel,
            shortcutsPanel
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

            aceEditor.on('change', function (e) {
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

/**
 * set button state from value length
 *
 * @param button the button to change the state
 * @param value  the value to determine the state of the button
 */
function setButtonState(button, value) {
    if (CKEDITOR.tools.isEmpty(value)) {
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

