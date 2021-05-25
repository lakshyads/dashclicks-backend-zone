// Import db
const { collections } = require('../schemas/schema.json');

/**
 * ## Function 3
 *
 * Finds the number of unutilized Field Availability slots for a given ```fieldId``` for a given date range.
 *
 * @param {*} fieldId String
 * @param {*} startDate String
 * @param {*} endDate String
 * @returns Integer denoting number of fields
 *
 * --
 * @example ```var unusedSlotsCount = function_3('fieldId_1', '2021-05-21', '2021-05-29')```
 *
 * --
 * @author Lakshya Dev Singh
 */
function function_3(fieldId, startDate, endDate) {
  // Handle invalid parameters
  if (
    typeof fieldId !== 'string' ||
    typeof startDate !== 'string' ||
    typeof endDate !== 'string'
  )
    throw new Error(
      `Invalid parameters: Expected (string, string, string) but found (${typeof fieldId}, ${typeof startDate}, ${typeof endDate})`
    );

  const filterSlotsByDateRange = (dateSlots) =>
    new Date(dateSlots.date) >= new Date(startDate) &&
    new Date(dateSlots.date) <= new Date(endDate);

  const findByFieldId = (field) => field.fieldId === fieldId;

  const availableSlotsCounter = (totalAvailableSlots, currentSlot) =>
    totalAvailableSlots + parseInt(currentSlot.availableSlots);

  const count = collections.field_availability_slots
    .find(findByFieldId)
    .timeSlotsByDate.filter(filterSlotsByDateRange)
    .reduce(availableSlotsCounter, 0);

  // return count;
  return count;
}

// Test ===============================================================================

function run() {
  try {
    // Expected O/P: 0
    console.log(function_3('fieldId_1', '2021-05-21', '2021-05-29'));

    // Expected O/P: 2
    console.log(function_3('fieldId_1', '2021-05-20', '2021-05-30'));

    // Expected O/P: 1
    console.log(function_3('fieldId_2', '2021-05-19', '2021-05-29'));

    // Expected O/P: [Error] Invalid parameters: Expected (string, string, string) but found (string, string, number)
    console.log(function_3('fieldId_2', '2021-05-21', 123));
  } catch (error) {
    console.log('[Error]', error.message);
  }
}

// run()

module.exports = function_3;
