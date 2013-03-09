'use strict'

var document = require('global/document')

module.exports = function(){
  var that = {}
  var vendors = ["webkit", "moz", "o", "ms"];
  var supported = false

  that.requestFullscreen = (function() {
    var el = document.documentElement
    var request = el.requestFullScreen || el.requestFullscreen 
    if(!request){
      for (var i=0,l=vendors.length;i<l;i++) {
        var v = vendors[i];
        var request = el[v + 'RequestFullScreen'] || el[v + 'RequestFullscreen']
        if(request)
          break
      }
    }
    supported = !!request
    return request ? request.bind(el) : function() {};
  })();

  that.exitFullscreen = (function() {
    var request
    var d = document
    request = d.cancelFullScreen || d.cancelFullscreen
    if(!request){
      for (var i=0,l=vendors.length;i<l;i++) {
        var v = vendors[i];
        var request = d[v + 'CancelFullScreen'] || d[v + 'CancelFullscreen']
        if(request)
          break
      }
    }
    return request ? request.bind(d) : function() {};
  })();

  that.isFullscreen = function() {
    return document.fullscreen || document.fullscreenEnabled || vendors.some(function(v){return document[v + 'FullScreen'] || document[v + 'IsFullScreen'] || document[v + 'Fullscreen']})
  }

  that.supported = supported

  return that
}()
