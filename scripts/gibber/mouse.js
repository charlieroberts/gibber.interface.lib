module.exports = function( Gibber ) {
  "use strict"
  
  var _m = null,
      $ = Gibber.dollar,
      headerFooterHeight = 0, 
      mappingProperties = {
        x : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        y : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        shiftX : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        shiftY : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        ctrlX : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        ctrlY : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
        button : {
          min:0, max:1,
          timescale:'interface',
          output: Gibber.LINEAR
        },
      }


    if( _m !== null ) return _m

    _m = {} 

    var storeX = 0, storeY = 0
    
    $.extend( _m, {
      x:0, y:0, prevX:0, prevY:0, shiftX:0, shiftY:0, prevShiftX:0, prevShiftY:0, button:0,
      isOn : false,
      name: 'Mouse',
      _onmousemove : function( e ) {
        // console.log( e )
        var prefix = '', upper = ''
        if( e.shiftKey ) prefix = 'shift'
        if( e.ctrlKey ) prefix = 'ctrl'
        
        upper = prefix === '' ? '' :  prefix.charAt(0).toUpperCase() + prefix.slice(1),
        // console.log( prefix, upper )
        _m[ 'prev' + upper + 'X' ] = storeX//_m[ prefix + ( prefix === ''  ? 'x' : 'X' )]  
        _m[ 'prev' + upper + 'Y' ] = storeY//_m[ prefix + ( prefix === ''  ? 'y' : 'Y' )]  
        storeX = _m[ prefix  + ( prefix === '' ? 'x' : 'X' ) ] = e.pageX - window.scrollX// / _m.ww 
        storeY = _m[ prefix  + ( prefix === '' ? 'y' : 'Y' ) ] = e.pageY - window.scrollY// / _m.wh 
        
        if( Gibber.Environment ) {
          storeY -= headerFooterHeight
          _m[ prefix  + ( prefix === '' ? 'y' : 'Y' ) ] -= headerFooterHeight
        }
        
        // console.log( e )
        if( typeof _m.onvaluechange === 'function' ) {
          _m.onvaluechange()
        }
      },
      _onmousedown : function() { 
        _m[ 'button' ] = 1 
        if( typeof _m.onvaluechange === 'function' ) {
          _m.onvaluechange()
        }
      },
      _onmouseup : function() { 
        _m[ 'button' ] = 0 
        if( typeof _m.onvaluechange === 'function' ) {
          _m.onvaluechange()
        }
      },
      on: function() {        
        if( ! _m.isOn ) {
          _m.isOn = true
          
          
          if( Gibber.Environment ) {
            _m.X.max = _m.ww = $( window ).width()
            
            if( Gibber.Environment.Layout.isFullScreen ) {
              _m.Y.max = _m.wh = $( window ).height()
            }else{
              var height = $( window ).height()  - $( 'thead' ).height() - $('tfoot').height()
              _m.Y.max =  _m.wh = height
            }
            
            headerFooterHeight = $( 'thead' ).height()
            
          }else{
            _m.X.max = window.innerWidth
            _m.Y.max = window.innerHeight
          }

          //$( window ).on( 'mousemove', _m._onmousemove )
          window.onmousemove = _m._onmousemove
        }
      },
      off: function() {
        if( _m.isOn ) {
          $( window ).off( 'mousemove', _m._onmousemove  )
          _m.isOn = false
        }
      },
      toggle : function() {
        if( _m.isOn ) {
          _m.off()
        }else{
          _m.on()
        }
      },
    })
    
    if( Gibber.Environment ) {
      if( Gibber.Environment.Layout.isFullScreen ) {
        mappingProperties.x.max = $( window ).width()
        mappingProperties.y.max = $( window ).height()
      }else{
        var height = $( window ).height()  - $( 'thead' ).height() - $('tfoot').height()
        mappingProperties.x.max = $( window ).width()
        mappingProperties.y.max = height
      }
    }else{
      mappingProperties.x.max = window.innerWidth
      mappingProperties.y.max = window.innerHeight
    }
    
    //mappingProperties.x.max = $( window ).width()
    //mappingProperties.y.max = $( window ).height()
    // create getter layer that turns mouse event handlers on as needed
    for( var prop in mappingProperties ) {
      !function() {
        var name = prop,
            Name = prop.charAt(0).toUpperCase() + prop.slice(1),
            value = _m[ prop ]
        
        Object.defineProperty( _m, Name, {
          configurable:true,
          get: function() {
            if( Name !== "Button" ) {
              _m.on();
            }
            return value 
          },
          set: function(v) { value = v; return _m }
        })
      }()
    }
    
    $.subscribe( '/layout/contentResize', function( obj ) {
      _m.ww = _m.X.max = obj.w
      _m.wh = _m.Y.max = obj.h
    })
    
    window.onmousedown = _m._onmousedown
    window.onmouseup   = _m._onmouseup
    
    //$( window ).on( 'mousedown', _m._onmousedown )
    //$( window ).on( 'mouseup',   _m._onmouseup   )
    
    Gibber.createProxyProperties( _m, mappingProperties, true )
    
    return _m
}