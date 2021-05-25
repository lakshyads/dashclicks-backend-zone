// Import db
const { collections } = require('../schemas/schema.json');

/**
 * ## Function 2
 *
 * Find players that have given an average Game Review rating of below ```avgRating``` stars
 * for their previous ```numPastGames``` games played.
 *
 * @param {*} avgRating Default 0
 * @param {*} numPastGames Default 1
 * @returns Array of user ids.
 *
 * --
 * @example ```var userIds = function_2(3.4, 5)```
 *
 * --
 * @author Lakshya Dev Singh
 */
function function_2(avgRating = 0, numPastGames = 1) {
  // Handle invalid parameters
  if (typeof avgRating !== 'number' || typeof numPastGames !== 'number')
    throw new Error(
      `Invalid parameters: Expected (number, number) but found (${typeof avgRating}, ${typeof numPastGames})`
    );

  // Handle edge case
  if (numPastGames <= 0) return [];

  let userIds = [];

  const addReviewRatingReducer = (sum, currentReview) =>
    sum + currentReview.rating;

  // iterate for each user reviews
  collections.game_reviews.forEach((user) => {
    let thisAvgRating = 0;

    // calculate average for last 'numPastGames' games
    if (user.reviewsByGames.length <= numPastGames) {
      thisAvgRating = parseFloat(
        user.reviewsByGames.reduce(addReviewRatingReducer, 0.0) /
          user.reviewsByGames.length
      );
    } else {
      thisAvgRating = parseFloat(
        user.reviewsByGames
          .slice(-1, 0 - parseInt(numPastGames))
          .reduce(addReviewRatingReducer, 0.0) / numPastGames
      );
    }
    // push if user has not played any game
    if (thisAvgRating < avgRating) userIds.push(user.userId);
  });

  return userIds;
}

// Test ===============================================================================

function run() {
  try {
    console.log(function_2(3.4, 5)); // Expected O/P: [ 'user_1', 'user_2' ]
    console.log(function_2(3.3, 5)); //  Expected O/P: [ 'user_2' ]
    console.log(function_2(3.4, '5')); // Expected O/P: [Error] Invalid parameters: Expected (number, number) but found (number, string)
  } catch (error) {
    console.log('[Error]', error.message);
  }
}

// run()

module.exports = function_2;
