!function() {

var Gibber = require( 'gibber.core.lib' )
Gibber.Interface = require( './interface.js' )( Gibber )
Gibber.isInstrument = true // don't use columns for interfaces

module.exports = Gibber

}()