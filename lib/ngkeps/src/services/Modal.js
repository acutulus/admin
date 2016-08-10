"use strict";

angular.module('ngKeps')

.service('$nkModalService', [

  '$window',
  '$document',

  function($window, $document) {
    var closecb = null;

    var overlay;
    var content_fixed;
    var popbox;
    var overlay_wrapper;


    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function() {
                handler.call(el);
            });
        }
    }

/*
<overlay_wrapper>
    <overlay>
</
<content_fixed>
    <popbox>
</
*/

    function init() {
        overlay = $document[0].createElement('div');
        content_fixed = $document[0].createElement('div');
        popbox = $document[0].createElement('div');
        overlay_wrapper = $document[0].createElement('div');
        content_fixed.id = 'ngkeps_content_fixed';
        content_fixed.setAttribute('style', 'position:fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);-webkit-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);opacity:1;z-index:2003;background-color:white; border-radius: 6px;padding: 20px 30px;');
        popbox.id = 'ngkeps_popbox';
        overlay_wrapper.id = "ngkeps_overlay_wrapper";
        overlay_wrapper.setAttribute('style', 'position:absolute;top:0;bottom:0;left:0;right:0;z-index:2002;');
        overlay.id = "ngkeps_overlay";
        overlay.setAttribute('style', 'position:fixed;top:0;bottom:0;left:0;right:0;opacity:0.3;width:100%;height:100%;background-color:black;z-index:2002;');
        overlay_wrapper.appendChild(overlay);
        content_fixed.appendChild(popbox);
        $document[0].body.appendChild(overlay_wrapper);
        $document[0].body.appendChild(content_fixed);
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        overlay_wrapper.addEventListener('click', hide);
        on($window, 'keypress', function(e) {
            //kill pop if button is ESC ;)
            if (e.keyCode == 27) {
                hide();
            }
        });
    }

    var show = function(config) {
        if (config) {
            var html = '<button type="button" class="close" onclick="window._ngkeps_model_hide(\'top_close\')" style="border: 1px solid #fff;border-radius: 15px;width: 32px;height: 32px;right: 0px;position: absolute;outline: none;color: #fff;transition: all 0.6s ease 0s;-webkit-transition: all 0.6s ease 0s;-moz-transition: all 0.6s ease 0s;-o-transition: all 0.6s ease 0s;-ms-transition: all 0.6s ease 0s;-webkit-backface-visibility: hidden;opacity: 0.6;filter: alpha(opacity=60);top: -40px;margin-top: -2px;"><span style="position: relative;top: -2px;">x</span></button>';

            if (typeof config.class == 'string' && config.class) {
                popbox.setAttribute('class', config.class);
            }
            if (config.keepLayout && (!config.class)) {
                popbox.setAttribute('style', 'position:relative;height:300px;width:300px;background-color:white;opacity:1;');
            }

            if (typeof config.content == 'string' && config.content && config.source == 'html') {
                html += config.content;
            }

            if (typeof config.content == 'string' && config.content && config.source == 'div') {
                html += $document[0].getElementById(config.content) ? $document[0].getElementById(config.content).innerHTML : config.content;
            }
            var buttons = '';
            if (config.buttons) {
                for (var i = 0; i < config.buttons.length; i++) {
                    if (typeof config.buttons[i] === 'object') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i].label+'\')" class="'+config.buttons[i].class+'" style="margin-left: 10px;">'+config.buttons[i].label+'</button>';
                    } else if (typeof config.buttons[i] === 'string') {
                       buttons += '<button onclick="window._ngkeps_model_hide(\''+config.buttons[i]+'\')" class="btn" style="margin-left: 10px;">'+config.buttons[i]+'</button>';
                    }
                }                
            }
            if (buttons !== '') {
                html += '<div style="text-align: right;padding-top: 10px;margin-top: 10px;">'+buttons+'</div>';
            }
            popbox.innerHTML = html;
            if (config.content && config.source === 'element') {
                popbox.appendChild(config.content);
            }
            if (config.content && config.source === 'angular-element') {
                angular.element(popbox).append(config.content);
            }

        }
        overlay_wrapper.style.display = '';
        overlay.style.display = '';
        content_fixed.style.display = '';
        closecb = config.close;
    };

    var hide = $window._ngkeps_model_hide = function(button) {
        overlay_wrapper.style.display = 'none';
        overlay.style.display = 'none';
        content_fixed.style.display = 'none';
        if (closecb) {
            closecb(button);
        }
    };

    //init on window loaded
    init();

    return {
        show:show,
        hide:hide
    };
}]);