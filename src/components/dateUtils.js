import getDate from "date-fns/getDate"
import getYear from "date-fns/getYear"
import getMonth from "date-fns/getMonth"
import isEqual from "date-fns/isEqual"
import startOfDay from "date-fns/startOfDay"

function areDatesEqualWithoutTime(dateOne, dateTwo) {
  let result = isEqual(startOfDay(dateOne), startOfDay(dateTwo))
  return result
}

export { areDatesEqualWithoutTime }
