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
var AceEditor,
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
					this.setValue(element.getAttribute("data-language"));
				},
				commit : function(element) {
					element.setAttribute("data-language", this.getValue());
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
				element = editor.document.createElement('pre');

				this.insertMode = true;
			}
			else
				this.insertMode = false;

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

			this.commitContent(pre);

			// set the full class to the pre tag
			shighlighter.setClass(this.element.getAttribute("data-language") + " " + settings.cls);

			// we add a new pre tag into ckeditor editor
			if(this.insertMode) {
				pre.setAttribute('class', shighlighter.getClass());
				editor.insertElement(pre);
			}

		}
	};
});

/**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
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