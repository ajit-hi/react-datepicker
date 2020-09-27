import getDate from "date-fns/getDate"
import getYear from "date-fns/getYear"
import getMonth from "date-fns/getMonth"
import isEqual from "date-fns/isEqual"
import startOfDay from "date-fns/startOfDay"
import addDays from "date-fns/addDays"

/* 
This function takes two dates and compares them and returns true if dates have year, month and day same
irrespective of time of these dates.
*/
function areDatesEqualWithoutTime(dateOne, dateTwo) {
  let dateOneStart = startOfDay(dateOne)
  let dateTwoStart = startOfDay(dateTwo)
  let result = isEqual(startOfDay(dateOne), startOfDay(dateTwo))
  return result
}

function checkIfDateIsInDisabledArray(dateToBeChecked, array) {
  for (let date of array) {
    if (areDatesEqualWithoutTime(dateToBeChecked, date)) {
      return true
    }
  }
  return false
}

/* This function takes an array of disabled dates and a date instance. It returns a date that 
    is closest to date instance provided and not in disabled arrays.
*/
function getClosestDateThatIsNotDisabled(date, disabledDates) {
  console.log(date, disabledDates)
  if (!checkIfDateIsInDisabledArray(date, disabledDates)) {
    return date
  }
  let i = 1
  while (true) {
    if (!checkIfDateIsInDisabledArray(addDays(date, i), disabledDates)) {
      return addDays(date, i)
    }
    if (!checkIfDateIsInDisabledArray(addDays(date, -i), disabledDates)) {
      return addDays(date, -i)
    }
    i++
  }
}

export { areDatesEqualWithoutTime, getClosestDateThatIsNotDisabled }
