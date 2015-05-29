define('templates/helpers/divide', ['hbs/handlebars'], function ( Handlebars ) {
  function divide (value, divider) {
    return Math.floor( divider/value );
  }
  Handlebars.registerHelper( 'divide', divide );
  return divide;
});