var SyntaxHighlighter = (function(){
    var sh;

    /**
     * Constructor
     * @param {String} sh The SyntaxHighlighter
     */
    function SyntaxHighlighter(sh) {
        switch(sh) {
            case "HIGHLIGHT" :
                this.sh = HIGHLIGHT;
                break;
            case "PRETTIFY" :
                this.sh = PRETTIFY;
                break;
            case "PRISM" :
                this.sh = PRISM;
                break;
            case "SYNTAX_HIGHLIGHTER" :
                this.sh = SYNTAX_HIGHLIGHTER;
                break;
            default :
                this.sh = {
                    _type  : "DEFAULT",
                    _cls : "",
                    _tag   : 'pre'
                }
                break;
        }
    }

    /**
     * Sets the SyntaxHighlighter type
     * @param {String} type The name of the SyntaxHighlighter
     */
    SyntaxHighlighter.prototype.setType = function(type) {
        this.sh._type = type;
    };

    /**
     * Gets the SyntaxHighlighter type
     * @return {String} The type of the SyntaxHighlighter
     */
    SyntaxHighlighter.prototype.getType = function() {
        return this.sh._type;
    };

    /**
     * Sets the full class of the SH object
     * @param {String} cls the class to add to the Object
     */
    SyntaxHighlighter.prototype.setCls = function(cls) {
        this.sh.cls = this.sh._cls + cls;
    };

    /**
     * Gets the full class of the SH Object
     * @return {String} the full class of the SH Object
     */
    SyntaxHighlighter.prototype.getCls = function() {
        return this.sh.cls;
    };

    /**
     * Get the tag to insert into the pre tag
     * @return {String} the tag to insert, pre otherwise
     */
    SyntaxHighlighter.prototype.getTag = function() {
        return this.sh._tag;
    };

    return SyntaxHighlighter;
})();



/**********************************/
/* SYNTAX HIGHLIGHTERS DEFINITION */
/**********************************/
var HIGHLIGHT = {
    _type : "HIGHLIGHT",
    _cls  : "", // only show language (done in pbckcode.js)
    _tag  : 'code'
}

var PRETTIFY = {
    _type : "PRETTIFY",
    _cls  : "prettyprint linenums lang-",
    _tag  : 'pre'
}

var PRISM = {
    _type : "PRISM",
    _cls  : "language-",
    _tag  : 'code'
};

var SYNTAX_HIGHLIGHTER = {
    _type : "SYNTAX_HIGHLIGHTER",
    _cls  : "brush: ",
    _tag  : 'pre'
}