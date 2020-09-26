import React, { useCallback } from "react"
import styled from "styled-components"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import getMonth from "date-fns/getMonth"
import addMonths from "date-fns/addMonths"

const MonthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

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
const MonthText = styled.div`
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

const Month = (props) => {
  const { selectedMonth, selectedDate, onChange } = props
  const handleRightButtonClick = useCallback((selectedMonth, selectedDate) => {
    onChange(addMonths(selectedDate, 1))
  })
  const handleLeftButtonClick = useCallback((selectedMonth, selectedDate) => {
    onChange(addMonths(selectedDate, -1))
  })

  return (
    <Container>
      <ScrollButton
        onClick={() => handleLeftButtonClick(selectedMonth, selectedDate)}
      >
        <ChevronLeftIcon />
      </ScrollButton>
      <MonthText>{MonthName[selectedMonth]}</MonthText>
      <ScrollButton
        onClick={() => handleRightButtonClick(selectedMonth, selectedDate)}
      >
        <ChevronRightIcon />
      </ScrollButton>
    </Container>
  )
}

export default Month
