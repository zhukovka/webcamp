define('templates/helpers/path', ['hbs/handlebars'], 
function ( Handlebars ) {
  function path (str) {
  	
    return str.replace(' ', '-');
  }
  Handlebars.registerHelper( 'path', path );
  return path;
});