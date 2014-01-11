/**
 * READ TIME!
 */

// Shortcut to array's slice
var slice = Array.prototype.slice;

/**
 * Copy over properties from passed in object onto
 * target object.
 * @param  {Object} target
 * @param  {...} object Can take any number of source objects
 *                      to copy properties from.
 * @return {Object}        Updated target object.
 */
var extend = function(target) {
  slice.call(arguments, 1).forEach(function(obj) {
    if (obj) {
      for (var key in obj) {
        target[key] = obj[key];
      }
    }
  });
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

/**
 * Calculates the reading time for a given input.
 * @param  {string} input   String input.
 * @param  {options} options Options to apply to
 *                           our calculations for this
 *                           invocation.
 * @return {Object}         Object of readTime information.
 */
var readTime = function (input, options) {

  var runTimeOptions = {};
  extend(runTimeOptions, CURRENT_OPTIONS, options);

  // Strip input of characters that would skew the word count
  var wordCount = input.replace(/[-*\s\n]+/gm, ' ').split(/\s/).length;

  // Calculate minutes
  var minutes = Math.floor(wordCount / runTimeOptions.WPM);

  // Calculate seconds
  var seconds = Math.floor(wordCount % runTimeOptions.WPM / (runTimeOptions.WPM / 60));

  var text = '';

  if (minutes < 1) {
    text += runTimeOptions.lessThanAMinute;
  } else {
    text += minutes + ' ' + pluralize('minute', minutes);

    if (seconds > 0) {
      text += ' ' + seconds + ' ' + pluralize('second', seconds);
    }
  }

  return {
    'text': text,
    'words': wordCount,
    'm': minutes,
    's': seconds
  };
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

// Set readTime to their initial default settings
readTime.reset();

module.exports = readTime;
