/* ui kit */
export type UIScale =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl"
  | "unset"

export type UIVariant = "outline" | "fill" | "text"
export type UIColors =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "primary"
  | "secondary"
  | "muted"
  | "unset"

export type UIBaseProps = {
  size?: UIScale
  color?: UIColors
}

export type UIOption = {
  label: string
  value: string
}

/* global */
export type ThemeVariant = "light" | "dark"
export type AppConfig = {
  defaultTheme: ThemeVariant
  formErrorMessages: {
    required: string
    min: string
    max: string
    regexp: string
  }
}
