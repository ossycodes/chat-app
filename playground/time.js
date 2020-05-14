/**
 * Timestamps:
 * timestamps are nothing more than just integers,whether positive or negative, even 0 is a valid timestamp
 * These numbers are all relative to a certain moment in history reffered to as the `UNIX EPIC` which is
 * Jan 1st 1970 at midnight 00:00Minutes:00Seconds am, this is stored in UTC which means it is timezone independent
 * Now at timestamp 0 actually represents this moment in history and positive numbers like 1000 are headed to the future
 * and negative numbers like -1000 head into the past, for example -1000 as a timestamp would represnt DEC 31st 1969 at 11:59:59seconds 
 * (that is 1 seconds into the past)
 * These timestamps in JS are stored in MS (1000MS = 1S)
 */

// const moment = require('moment');

// var createdAt = 123456234;
// var date = moment(createdAt);
// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM YYYY Do, hh a'));

/**
 * we can create Timestamps with moment using valueOf(), which as the same effect as:
 * new Date().getTime();
 */
// var someTimestamp = moment().valueOf();
// console.log(someTimestamp);