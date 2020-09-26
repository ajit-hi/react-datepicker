import React, { useCallback, useRef, useEffect } from "react"
import styled from "styled-components"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import { useTheme } from "../ThemeContext/ThemeContext"
import getDay from "date-fns/getDay"
import getDate from "date-fns/getDate"
import isEqual from "date-fns/isEqual"
import format from "date-fns/format"

/* Define widths as constants. */

const THREE_TWENTY_PX = "320px"
const FOURTY_PX = "40px"

const WEEKDAY_NAME = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

const Container = styled.div`
  width: ${THREE_TWENTY_PX};
  height: ${FOURTY_PX};
  display: flex;
  margin: auto;
  color: #b3b3b3;
  @media (min-width: 481px) {
    width: 474px;
    height: 62px;
  }
  @media (min-width: 768px) {
    width: 690px;
    height: 90px;
  }
`
const ScrollButton = styled.button`
  height: 100%;
  width: 20px;
  border: none;
  background-color: #f9f9f9;
  padding: 0;
  font-size: 20px;
  color: #b4b9c7;
  cursor: pointer;
  @media (min-width: 768px) {
    min-width: 30px;
  }
`
const DayList = styled.ul`
  list-style: none;
  text-decoration: none;
  display: flex;
  padding: 0;
  width: 280px;
  height: 100%;
  margin: 0;
  overflow-y: hidden;
  overflow-x: auto;
  @media (min-width: 481px) {
    width: 434px;
    min-width: 434px;
  }
  @media (min-width: 768px) {
    width: 630px;
    min-width: 630px;
  }
  scrollbar-width: none; /* for firefox */
  -ms-overflow-style: none; /* for IE and Edge */
  &:: -webkit-scrollbar {
    display: none; /* For Chrome Safari and opera */
  }
`
const DayListItem = styled.li`
  width: 40px;
  min-width: 40px;
  heigth: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  @media (min-width: 481px) {
    width: 62px;
    min-width: 62px;
  }
  @media (min-width: 768px) {
    width: 90px;
    min-width: 90px;
  }
`
const DayButton = styled.button`
  background: transparent;
  height: 100%;
  width: 100%;
  border: none;
  ${(props) => (props.disabled ? "color: #b3b3b3;" : "color:black;")}
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? `color: white; background-color: ${props.theme.primary} ;`
      : ""}
`

const DateDayContainer = styled.div`
  font-size: 12px;
  text-align: center;
  font-weight: 500 !important;
  @media (min-width: 768px) {
    font-size: 20px;
  }
`
const DateWeekDayContainer = styled.div`
  font-size: 12px;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`

const Days = (props) => {
  const { dayArray, selectedDate, onChange } = props
  const theme = useTheme()
  const dayListRef = useRef(null)
  // store a ref for li item showing date. based of width of li item we will scroll right
  // so that selected value is shown in the view.
  const dayListItemRef = useRef(null)

  const handleRightButtonClick = useCallback(() => {
    // Scroll the ul in rigth with scroll amount equal to client width.
    let updatedScrollLeft =
      dayListRef.current.scrollLeft + dayListRef.current.clientWidth
    if (updatedScrollLeft > dayListRef.current.scrollWidth) {
      updatedScrollLeft = dayListRef.current.scrollWidth
    }
    dayListRef.current.scrollLeft = updatedScrollLeft
  })

  const handleLeftButtonClick = useCallback(() => {
    // Scroll the ul in left direction with scroll amount equal to client width.
    let updatedScrollLeft =
      dayListRef.current.scrollLeft - dayListRef.current.clientWidth
    if (updatedScrollLeft < 0) {
      updatedScrollLeft = 0
    }
    console.log(updatedScrollLeft)
    dayListRef.current.scrollLeft = updatedScrollLeft
  })

  // when component props change that is new date is selected
  // We use this ref to scroll selected date into view.
  useEffect(() => {
    let noOfDaysInDayArray = dayArray.length
    let dayItemWidth = dayListItemRef.current.clientWidth
    // We use this formula to scroll the selected date to center in view whenver the date changes.
    dayListRef.current.scrollLeft =
      (getDate(selectedDate) - 1) * dayItemWidth - 3 * dayItemWidth
  }, [props])

  return (
    <Container>
      <ScrollButton onClick={handleLeftButtonClick}>
        <ChevronLeftIcon fontSize="small" viewBox="0 0 20 20" />
      </ScrollButton>
      <DayList ref={dayListRef}>
        {dayArray.map((day, index) => (
          <DayListItem key={format(day.day, "yyyy-MM-dd")} ref={dayListItemRef}>
            <DayButton
              isSelected={day.isSelected}
              theme={theme}
              onClick={() => onChange(day.day)}
              disabled={day.isDisabled}
            >
              <DateDayContainer>{getDate(day.day)}</DateDayContainer>
              <DateWeekDayContainer>
                {WEEKDAY_NAME[getDay(day.day)]}
              </DateWeekDayContainer>
            </DayButton>
          </DayListItem>
        ))}
      </DayList>
      <ScrollButton onClick={handleRightButtonClick}>
        <ChevronRightIcon fontSize="small" viewBox="0 0 20 20" />
      </ScrollButton>
    </Container>
  )
}

export default Days
