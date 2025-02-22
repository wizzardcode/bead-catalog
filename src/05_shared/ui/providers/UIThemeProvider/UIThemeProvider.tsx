import { APP_CONFIG } from "@config/appConfig"
import { ThemeVariant } from "@models/uiKit"
import { createContext, FC, ReactNode, useState } from "react"

type ThemeState = {
  theme: ThemeVariant
  toggleTheme: () => void
}

type ThemeProviderProps = {
  children: ReactNode | ReactNode[]
}

const ThemeContext = createContext<ThemeState>({
  theme: APP_CONFIG.defaultTheme,
  toggleTheme: () => {},
})
export default ThemeContext

export const UIThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeVariant>(APP_CONFIG.defaultTheme)

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
