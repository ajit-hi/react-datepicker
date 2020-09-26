import React, { useContext } from "react"
export const AVAILABLE_THEMES = [
  { theme: "BLUE", color: "#00F" },
  { theme: "PURPLE", color: "#800080" },
]

const themes = {
  BLUE: {
    primary: "#00F",
    secondary: "#f0f0f0",
  },
  PURPLE: {
    primary: "#800080",
    secondary: "#f0f0f0",
  },
}

export const ThemeContext = React.createContext()

export function useTheme() {
  return themes[useContext(ThemeContext).theme]
}
