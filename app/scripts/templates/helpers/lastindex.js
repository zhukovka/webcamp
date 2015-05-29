define('templates/helpers/lastindex', ['hbs/handlebars'], 
function ( Handlebars ) {
  function lastindex (array) {
  	var i = array.length-1;
    return array[i];
  }
  Handlebars.registerHelper( 'lastindex', lastindex );
  return lastindex;
});