define('templates/helpers/safe', ['hbs/handlebars'], function ( Handlebars ) {
  function safe (value) {
    return new Handlebars.SafeString(value);
  }
  Handlebars.registerHelper( 'safe', safe );
  return safe;
});