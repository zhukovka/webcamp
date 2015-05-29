define('templates/helpers/add', ['hbs/handlebars'], function ( Handlebars ) {
  function add (value, addition) {
    return value + addition;
  }
  Handlebars.registerHelper( 'add', add );
  return add;
});