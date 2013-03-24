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
					type  : "DEFAULT",
					cls : "",
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
	SyntaxHighlighter.prototype.setCls = function(cls) {
		this._sh.cls += cls;
	};

	/**
	 * Gets the full class of the SH Object
	 * @return {String} the full class of the SH Object
	 */
	SyntaxHighlighter.prototype.getCls = function() {
		return this._sh.cls;
	};

	/**
	 * Get the tag to insert into the pre tag
	 * @return {String} the tag to insert, pre otherwise
	 */
	SyntaxHighlighter.prototype.getTag = function() {
		return this._sh.tag;
	};

	return SyntaxHighlighter;
})();



/**********************************/
/* SYNTAX HIGHLIGHTERS DEFINITION */
/**********************************/
var HIGHLIGHT = {
	type : "HIGHLIGHT",
	cls  : "", // only show language (done in pbckcode.js)
	tag  : 'code'
}

var PRETTIFY = {
	type : "PRETTIFY",
	cls  : "prettyprint linenums lang-",
	tag  : 'pre'
}

var PRISM = {
	type : "PRISM",
	cls  : "language-",
	tag  : 'code'
};

var SYNTAX_HIGHLIGHTER = {
	type : "SYNTAX_HIGHLIGHTER",
	cls  : "brush: ",
	tag  : 'pre'
}