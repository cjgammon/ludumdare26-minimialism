/*global define signals*/
define([],

	function () {
		
		var UserEvent = {
            NAV_CLICK: new signals.Signal(),
            INFO_CLICK: new signals.Signal(),
            SOUND_CLICK: new signals.Signal(),
            KEY_DOWN: new signals.Signal(),
            KEY_UP: new signals.Signal(),
            MOUSE_MOVE: new signals.Signal(),
            RESIZE: new signals.Signal(),
            FIREBALL: new signals.Signal()
        };

		return UserEvent;
    });
