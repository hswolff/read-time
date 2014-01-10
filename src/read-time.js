/**
 * READ TIME!
 */

/**
 * Copy over properties from source onto
 * target object.
 * @param  {Object} target
 * @param  {Object} source
 * @return {Object}        Updated target object.
 */
var extend = function(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
  return target;
};

/**
 * Pluralize a word if there's more than 1
 * of the count given.
 * @param  {string} word  Word to pluralize.
 * @param  {number} count How many of this thing.
 * @return {string}
 */
var pluralize = function(word, count) {
  return word + (count > 1 ? 's' : '');
};


/**
 * The options that readTime ships with.
 * Can be reverted to these settings
 * by using readTime.reset().
 * @type {Object}
 */
var DEFAULT_OPTIONS = {
  WPM: 200,
  lessThanAMinute: 'Less than a minute'
};

/**
 * What options are currently
 * used by default for all
 * invocations of readTime.
 * @type {Object}
 */
var CURRENT_OPTIONS = {};


var readTime = function (input, options) {

  var runTimeOptions = {};
  extend(runTimeOptions, DEFAULT_OPTIONS);
  extend(runTimeOptions, options);

  var wordCount = input.replace(/[-*\s\n]+/gm, ' ').split(/\s/).length;

  var minutes = Math.floor(wordCount / runTimeOptions.WPM);

  var seconds = Math.floor(wordCount % runTimeOptions.WPM / (runTimeOptions.WPM / 60));

  var resp = '';

  if (minutes < 1) {
    resp += runTimeOptions.lessThanAMinute;
  } else {
    resp += minutes + ' ' + pluralize('minute', minutes);

    if (seconds > 0) {
      resp += ' ' + seconds + ' ' + pluralize('second', seconds);
    }
  }

  return resp;
};

/**
 * Sets what options should by default
 * be applied to all invocations.
 * @param  {Object} options Updated options object.
 * @return {readTime}
 */
readTime.defaults = function(options) {
  extend(CURRENT_OPTIONS, options);
  return readTime;
};

/**
 * Resets CURRENT_OPTIONS back to
 * their initial setting.
 * @return {readTime}         [description]
 */
readTime.reset = function() {
  CURRENT_OPTIONS = {};
  extend(CURRENT_OPTIONS, DEFAULT_OPTIONS);

  return readTime;
};

// Set DEFAULT_OPTIONS as the iniital defaults
readTime.defaults(DEFAULT_OPTIONS);

module.exports = readTime;
