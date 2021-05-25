// Import db
const { collections } = require('../schemas/schema.json');

/**
 * ## Function 1
 *
 * Find players who haven't played any games since a given date.
 *
 * @param {*} sinceDate Date string. ***Ex:** ```'2021-05-22'```*
 * @returns Array of user ids.
 *
 * --
 * @example ```var userIds = function_1('2021-05-24');```
 *
 * --
 * @author Lakshya Dev Singh
 */
function function_1(sinceDate = new Date().toISOString().split('T')[0]) {
  // Handle invalid parameters
  if (typeof sinceDate !== 'string')
    throw new Error(
      `Invalid parameters: Expected (string) but found (${typeof sinceDate})`
    );

  let userIds = [];

  const filterSignupsByDate = (signup) =>
    new Date(signup.date) >= new Date(sinceDate);

  collections.game_signups.forEach((user) => {
    let hasPlayed = false;

    // check if user has played or not
    for (const signupDate of user.signupsByDate.filter(filterSignupsByDate)) {
      if (signupDate.noOfPlayedGames > 0) hasPlayed = true;
      break;
    }

    // push if user has not played any game
    if (!hasPlayed) userIds.push(user.userId);
  });

  return userIds;
}

// Test ===============================================================================

function run() {
  try {
    console.log(function_1('2021-05-22')); // Expected O/P: [ 'user_1', 'user_2' ]
    console.log(function_1('2021-05-21')); // Expected O/P: [ 'user_2' ]
    console.log(function_1()); // Expected O/P: [ 'user_1', 'user_2' ]

    // Expected O/P: [Error] Invalid parameters: Expected (string) but found (number)
    console.log(function_1(123));
  } catch (error) {
    console.log('[Error]', error.message);
  }
}

// run()

module.exports = function_1;
