import React, { useCallback } from "react"
import styled from "styled-components"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import addYears from "date-fns/addYears"
import { getClosestDateThatIsNotDisabled } from "./dateUtils"

const Container = styled.div`
  height: 24px;
  display: flex;
  width: 150px;
  background-color: #fff;
  font-size: smaller;
  color: #b3b3b3;
  @media (min-width: 481px) {
    height: 30px;
  }
  @media (min-width: 768px) {
    height: 35px;
  }
`
const YearText = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`
const ScrollButton = styled.button`
  width: 24px;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #f9f9f9;
  border: none;
  color: #b4b9c7;
  cursor: pointer;
`

const Year = (props) => {
  const { selectedYear, selectedDate, onChange, disabledDays } = props
  const handleRightButtonClick = useCallback((selectedDate) => {
    onChange(
      getClosestDateThatIsNotDisabled(addYears(selectedDate, 1), disabledDays)
    )
  })
  const handleLeftButtonClick = useCallback((selectedDate) => {
    onChange(
      getClosestDateThatIsNotDisabled(addYears(selectedDate, -1), disabledDays)
    )
  })

  return (
    <Container>
      <ScrollButton onClick={() => handleLeftButtonClick(selectedDate)}>
        <ChevronLeftIcon />
      </ScrollButton>
      <YearText>{selectedYear}</YearText>
      <ScrollButton onClick={() => handleRightButtonClick(selectedDate)}>
        <ChevronRightIcon />
      </ScrollButton>
    </Container>
  )
}

export default Year
