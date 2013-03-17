var SyntaxHighlighter = (function(){
	var _sh;

	/**
	 * Constructor
	 * @param {String} sh The SyntaxHighlighter
	 */
	function SyntaxHighlighter(sh) {
		switch(sh) {
			case "HIGHLIGHT" :
				this._sh = HIGHLIGHT;
				break;
			case "PRETTIFY" :
				this._sh = PRETTIFY;
				break;
			case "PRISM" :
				this._sh = PRISM;
				break;
			case "SYNTAX_HIGHLIGHTER" :
				this._sh = SYNTAX_HIGHLIGHTER;
				break;
			default :
				this._sh = {
					name  : "Default",
					type  : "DEFAULT",
					class : "",
					tag   : 'pre'
				}
				break;
		}
	}

	/**
	 * Sets the SyntaxHighlighter type
	 * @param {String} type The name of the SyntaxHighlighter
	 */
	SyntaxHighlighter.prototype.setType = function(type) {
		this._sh = type;
	};

	/**
	 * Gets the SyntaxHighlighter type
	 * @return {String} The type of the SyntaxHighlighter
	 */
	SyntaxHighlighter.prototype.getType = function() {
		return this._sh.type;
	};

	/**
	 * Sets the full class of the SH object
	 * @param {String} cls the class to add to the Object
	 */
	SyntaxHighlighter.prototype.setClass = function(cls) {
		this._sh.class += cls;
	};

	/**
	 * Gets the full class of the SH Object
	 * @return {String} the full class of the SH Object
	 */
	SyntaxHighlighter.prototype.getClass = function() {
		return this._sh.class;
	};

	/**
	 * Get the tag to insert into the pre tag
	 * @return {String} the tag to insert, FALSE otherwise
	 */
	SyntaxHighlighter.prototype.getTag = function() {
		return (this._sh.class != '') ?
				this._sh.class :
				false;
	};

	return SyntaxHighlighter;
})();



/**********************************/
/* SYNTAX HIGHLIGHTERS DEFINITION */
/**********************************/
var HIGHLIGHT = {
	type  : "HIGHLIGHT",
	class : "",
	tag   : 'code'
}

var PRETTIFY = {
	type  : "PRETTIFY",
	class : "prettyprint linenums lang-",
	tag   : ''
}

var PRISM = {
	type  : "PRISM",
	class : "language-",
	tag   : 'code'
};

var SYNTAX_HIGHLIGHTER = {
	type  : "SYNTAX_HIGHLIGHTER",
	class : "brush: ",
	tag   : ''
}