import React, { useState } from "react"
import {
  ThemeContext,
  AVAILABLE_THEMES,
  useTheme,
} from "../ThemeContext/ThemeContext"
import styled from "styled-components"
import DatePicker from "./DatePicker"
import format from "date-fns/format"

const ThemeSelectButton = styled.button`
  background-color: ${(props) => props.theme.color};
  height: 25px;
  width: 25px;
  border-radius: 5px;
  border: 2px solid #fff;
  margin: 0 5px;
  cursor: pointer;
  box-sizing: border-box;
  transition-duration: 0.2s;
  &: hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  }
`

const formats = ["yyyy-MMM-dd", "yyyy-MM-dd", "yy-MM-dd", "yyyy/MM/dd"]

const DatePickerRenderer = () => {
  const [theme, setTheme] = useState(AVAILABLE_THEMES[0])
  const [date, setDate] = useState(null)

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <div style={{ background: "blue" }}>
          <h3
            style={{
              color: "white",
              textTransform: "uppercase",
              margin: 0,
              padding: 10,
            }}
          >
            React Date Picker
          </h3>
        </div>
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: 10,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              fontSize: "smaller",
              margin: "0 5px",
            }}
          >
            Themes
          </div>
          {AVAILABLE_THEMES.map((theme) => (
            <ThemeSelectButton
              theme={theme}
              onClick={() => setTheme(theme)}
            ></ThemeSelectButton>
          ))}
        </div>
        <DatePicker
          value={date}
          onChange={(date) => setDate(date)}
          disabledDays={[new Date(2020, 8, 25)]}
          disabled={false}
        />
        <div
          style={{
            marginTop: 50,
            textAlign: "center",
            backgroundColor: theme.color,
            maxWidth: 400,
            color: "white",
            margin: "auto",
            padding: 10,
          }}
        >
          <div
            style={{
              textTransform: "uppercase",
              fontWeight: "bold",
              margin: 10,
            }}
          >
            Selected date in different formats-
          </div>
          {formats.map((item) => (
            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }}>{item}</div>
              <div style={{ flexGrow: 1 }}>
                {format(date || new Date(), item)}
              </div>
            </div>
          ))}
        </div>
      </ThemeContext.Provider>
    </>
  )
}

export default DatePickerRenderer
