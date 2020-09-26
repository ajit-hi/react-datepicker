import React, { useMemo } from "react"
import { useTheme } from "../ThemeContext/ThemeContext"
import styled from "styled-components"
import Year from "./Year"
import Month from "./Month"
import Days from "./Days"
import addDays from "date-fns/addDays"
import toDate from "date-fns/toDate"
import { areDatesEqualWithoutTime } from "./dateUtils"
import isEqual from "date-fns/isEqual"
import startOfMonth from "date-fns/startOfMonth"
import endOfMonth from "date-fns/endOfMonth"
import getMonth from "date-fns/getMonth"
import getYear from "date-fns/getYear"

const Container = styled.div`
  background-color: #f4f4f4;
  max-width: 800px;
  margin: 50px auto;
  padding: 15px 0;
`

const YearMonthContainer = styled.div`
  display: flex;
  margin: auto;
  max-width: 320px;
  justify-content: space-around;
  @media (min-width: 481px) {
    min-width: 400px;
  }
  @media (min-width: 768px) {
    width: 630px;
    min-width: 630px;
  }
`

const DaysContainer = styled.div`
  margin: 15px 0 0 0;
`

const DatePicker = ({ value, onChange, disabledDays }) => {
  const getDaysArray = useMemo(() => {
    let dayArray = []
    let startOfMonthDate = startOfMonth(value)
    let endOfMonthDate = endOfMonth(value)

    // get a date to iterate from start of the selected dates month to end of the month.
    // by this way we will push into array all the dates of the month of selected date.
    let iteratorDate = startOfMonthDate
    while (iteratorDate <= endOfMonthDate) {
      let date = {
        day: iteratorDate,
        isSelected: areDatesEqualWithoutTime(value, iteratorDate),
      }
      // find of if this day is disabled
      let isDisabled = false
      for (let day of disabledDays) {
        if (areDatesEqualWithoutTime(day, iteratorDate)) {
          isDisabled = true
          break
        }
      }
      date.isDisabled = isDisabled
      dayArray.push(date)
      iteratorDate = addDays(iteratorDate, 1)
    }
    return dayArray
  }, [value])

  const theme = useTheme()
  return (
    <Container>
      <YearMonthContainer>
        <Year
          selectedYear={getYear(value)}
          selectedDate={value}
          onChange={onChange}
        />
        <Month
          selectedMonth={getMonth(value)}
          selectedDate={value}
          onChange={onChange}
        />
      </YearMonthContainer>
      <DaysContainer>
        <Days
          dayArray={getDaysArray}
          selectedDate={value}
          onChange={onChange}
        />
      </DaysContainer>
    </Container>
  )
}

export default React.memo(DatePicker)
