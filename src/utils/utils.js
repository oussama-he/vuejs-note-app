import marked from 'marked'

function escapeHTML(s) {
    return s.replace(/[^0-9A-Za-z ]/g, function(c) {
        return "&#" + c.charCodeAt(0) + ";";
    } );
}

function  compileMarkdown(text) {
    let result = marked(text, { sanitize: true });
    return result.replace(/\n/g, "");
  }

function getUnixTimestamp() {
    return new Date().getTime()/1000|0
}

function countWords(str) {
    return str.trim().split(/\s+/).length;
}


export { escapeHTML, compileMarkdown, getUnixTimestamp, countWords}