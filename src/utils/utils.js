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

export { escapeHTML, compileMarkdown}