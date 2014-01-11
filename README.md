read-time
===========

Calculate how long it will take you to read some text.

Usage
=====

```
var readTime = require('read-time');

var input = 'Hello this is some text';

readtime(input); // 'Less than a minute';
```

Based on the average [word per minute](http://en.wikipedia.org/wiki/Words_per_minute) that an adult reads - 200 WPM.

The amount of words in the input is calculated and uses WPM to divide and calculate the length of time it'll take
to read the given input.

What you will see using this module.

Given: 200 words

Expect: **1 minute**

Given: 300 words

Expect: **1 minute 30 seconds**

Given: 776 words

Expect: **3 minutes 52 seconds**

Changelog
=========

### 1.0.0
Initial release.


License
=======

MIT
