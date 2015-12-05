'use strict';

var RNSound = require('react-native').NativeModules.RNSound;

var nextKey = 0;

function Sound(filename, basePath, onError) {
  this._filename = basePath ? basePath + '/' + filename : filename;
  this._key = nextKey++;
  this._duration = -1;
  this._numberOfChannels = -1;
  this._volume = 1;
  this._pan = 0;
  this._numberOfLoops = 0;
  RNSound.prepare(this._filename, this._key, (error, props) => {
    if (props) {
      if (typeof props.duration === 'number') {
        this._duration = props.duration;
      }
      if (typeof props.numberOfChannels === 'number') {
        this._numberOfChannels = props.numberOfChannels;
      }
    }
    onError && onError(error);
  });
}

Sound.prototype.play = function(onEnd) {
  RNSound.play(this._key, (successfully) => onEnd && onEnd(successfully));
  return this;
};

Sound.prototype.pause = function() {
  RNSound.pause(this._key);
  return this;
};

Sound.prototype.stop = function() {
  RNSound.stop(this._key);
  return this;
};

Sound.prototype.release = function() {
  RNSound.release(this._key);
  return this;
};

Sound.prototype.getDuration = function() {
  return this._duration;
};

Sound.prototype.getNumberOfChannels = function() {
  return this._numberOfChannels;
};

Sound.prototype.getVolume = function() {
  return this._volume;
};

Sound.prototype.setVolume = function(value) {
  RNSound.setVolume(this._key, this._volume = value);
  return this;
};

Sound.prototype.getPan = function() {
  return this._pan;
};

Sound.prototype.setPan = function(value) {
  RNSound.setPan(this._key, this._pan = value);
  return this;
};

Sound.prototype.getNumberOfLoops = function() {
  return this._numberOfLoops;
};

Sound.prototype.setNumberOfLoops = function(value) {
  RNSound.setNumberOfLoops(this._key, this._numberOfLoops = value);
  return this;
};

Sound.prototype.getCurrentTime = function(callback) {
  RNSound.getCurrentTime(this._key, callback);
};

Sound.prototype.setCurrentTime = function(value) {
  RNSound.setCurrentTime(this._key, value);
  return this;
};

Sound.enable = function(enabled) {
  RNSound.enable(enabled);
};

Sound.enable(true);

Sound.MAIN_BUNDLE = RNSound.MainBundlePath;
Sound.DOCUMENT = RNSound.NSDocumentDirectory;
Sound.LIBRARY = RNSound.NSLibraryDirectory;
Sound.CACHES = RNSound.NSCachesDirectory;

module.exports = Sound;