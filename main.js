// Import My_Custom_DB
const my_db = require('./My_Custom_DB');

// Calls
try_function_1();
try_function_2();
try_function_3();

// Test function_1
function try_function_1() {
  try {
    console.log('\n----------------------------------------------------------');
    console.log('Trying out Function 1: \n');
    console.log(my_db.function_1('2021-05-22')); // Expected O/P: [ 'user_1', 'user_2' ]
    console.log(my_db.function_1('2021-05-21')); // Expected O/P: [ 'user_2' ]
    console.log(my_db.function_1()); // Expected O/P: [ 'user_1', 'user_2' ]
    console.log(my_db.function_1(123)); // Expected O/P: [Error] Invalid parameters: Expected (string) but found (number)
  } catch (error) {
    console.log('[Error]', error.message);
  }
}

// Test function_2
function try_function_2() {
  console.log('\n----------------------------------------------------------');
  console.log('Trying out Function 2: \n');
  try {
    console.log(my_db.function_2(3.4, 5)); // Expected O/P: [ 'user_1', 'user_2' ]
    console.log(my_db.function_2(3.3, 5)); //  Expected O/P: [ 'user_2' ]
    console.log(my_db.function_2(3.4, '5')); // Expected O/P: [Error] Invalid parameters: Expected (number, number) but found (number, string)
  } catch (error) {
    console.log('[Error]', error.message);
  }
}

// Test function_3
function try_function_3() {
  console.log('\n----------------------------------------------------------');
  console.log('Trying out Function 3: \n');
  try {
    console.log(my_db.function_3('fieldId_1', '2021-05-21', '2021-05-29')); // Expected O/P: 0
    console.log(my_db.function_3('fieldId_1', '2021-05-20', '2021-05-30')); // Expected O/P: 2
    console.log(my_db.function_3('fieldId_2', '2021-05-19', '2021-05-29')); // Expected O/P: 1
    console.log(my_db.function_3('fieldId_2', '2021-05-21', 123)); // Expected O/P: [Error] Invalid parameters: Expected (string, string, string) but found (string, string, number)
  } catch (error) {
    console.log('[Error]', error.message);
  }
}
