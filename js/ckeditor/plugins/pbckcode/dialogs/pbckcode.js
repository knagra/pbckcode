CKEDITOR.dialog.add('pbckcodeDialog', function ( editor ) {

// if there is no user settings
// create an empty object
if(editor.config.pbckcode == undefined)
	editor.config.pbckcode = {};

// default settings object
DEFAULT_SETTINGS = {
	cls         : '',
	modes       :  [ ['HTML', 'html'],['PHP', 'php'], ['CSS', 'css'], ['JS', 'javascript'] ],
	theme       : 'textmate',
	highlighter : 'PRISM',
};

// merge user settings with default settings
settings = merge_settings(DEFAULT_SETTINGS, editor.config.pbckcode);

// init vars
var AceEditor, pre,
    shighlighter = new SyntaxHighlighter(settings.highlighter);



// dialog code
return {
		// Basic properties of the dialog window: title, minimum size.
		title: editor.lang.pbckcode.title,
		minWidth: 600,
		minHeight: 400,
		// Dialog window contents definition.
		contents:
		[{
			id		 : 'code-container',
			label	 : editor.lang.pbckcode.tabCode,
			elements :
			[{
				type    : 'select',
				id      : 'code-select',
				items   : settings.modes,
				default : settings.modes[0][1],
				setup   : function(element) {
					if(element) {
						element = element.getAscendant('pre', true);
						this.setValue(element.getAttribute("data-pbcklang"));
					}
				},
				commit : function(element) {
					if(element) {
						element = element.getAscendant('pre', true);
						element.setAttribute("data-pbcklang", this.getValue());
					}
				},
				onChange: function(api) {
					AceEditor.getSession().setMode("ace/mode/" + this.getValue());
				}
			},
			{
				type  : 'html',
				html  : '<div id="code"></div>',
				setup : function(element) {
					// get the value of the editor
					code = element.getHtml();
					// replace some regexp
					code = code.replace(new RegExp('<br/>', 'g'), '\n');
					code = code.replace(new RegExp('<br>', 'g'), '\n');
					code = code.replace(new RegExp('&lt;', 'g'), '<');
					code = code.replace(new RegExp('&gt;', 'g'), '>');
					code = code.replace(new RegExp('&amp;', 'g'), '&');

					AceEditor.setValue(code);
				},
				commit : function(element) {
					element.setText(AceEditor.getValue());
				}
			}]
		}],
		onLoad: function() {
			// we get the #code div and style it
			var code = document.getElementById('code');
			code.style.width = '600px';
			code.style.height = '380px';
			code.style.position = 'relative';

			// we load the ACE plugin to our div
			AceEditor = ace.edit("code");
			AceEditor.getSession().setMode("ace/mode/" + settings.modes[0][1]);
			AceEditor.setTheme("ace/theme/" + settings.theme);
		},
		onShow : function() {
			// get the selection
			var selection = editor.getSelection();
			// get the entire element
			var element = selection.getStartElement();

			// looking for the pre parent tag
			if(element)
				element = element.getAscendant('pre', true);

			// if there is no pre tag, it is an addition. Therefore, it is an edition
			if(!element || element.getName() != 'pre') {
				element = new CKEDITOR.dom.element('pre');

				if(shighlighter.getTag() != 'pre') {
					element.append(new CKEDITOR.dom.element('code'));
				}

				this.insertMode = true;
			}
			else {
				if(shighlighter.getTag() != 'pre') {
					element = element.getChild(0);
				}
				this.insertMode = false;
			}
			// get the element to fill the inputs
			this.element = element;

			// we empty the editor
			AceEditor.setValue('');

			// we fill the inputs
			if(!this.insertMode)
				this.setupContent(this.element);
		},
		// This method is invoked once a user clicks the OK button, confirming the dialog.
		onOk: function() {
			var dialog = this,
				pre = this.element;

				if(shighlighter.getTag()  != 'pre') {
					code = this.element.getChild(0);
				}

				if(shighlighter.getTag()  == 'pre') {
					this.commitContent(pre);
				} else {
					this.commitContent(code);
				}

			// set the full class to the code tag
			shighlighter.setCls(pre.getAttribute("data-pbcklang") + " " + settings.cls);

			// we add a new code tag into ckeditor editor
			if(this.insertMode) {
				if(shighlighter.getTag()  == 'pre') {
					pre.setAttribute('class', shighlighter.getCls());
				} else {
					code.setAttribute('class', shighlighter.getCls());
				}
				editor.insertElement(pre);
			}

		}
	};
});


/**
 * Merge defaults settings with user settings
 * @param  {Object} dft the default object
 * @param  {Object} usr the user object
 * @return {Object} the merged object
 */
function merge_settings(dft, usr){
    var obj3 = {};
    for (var attrname in dft) { obj3[attrname] = dft[attrname]; }
    for (var attrname in usr) { obj3[attrname] = usr[attrname]; }
    return obj3;
}