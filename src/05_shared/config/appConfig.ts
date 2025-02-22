import { AppConfig } from "@models/uiKit"

export const APP_CONFIG: AppConfig = {
  defaultTheme: "light",
  formErrorMessages: {
    required: "Это поле обязательно",
    min: "Минимальное количество символов",
    max: "Максимальное количество символов",
    regexp: "Данные должны соответствовать формату",
  },
}

export const APP_ROUTER_PATHS = {
  CATALOG_SCHEME: "/catalog",
  SUPPORT_MONEY: "/q",
  EDITOR: "/editor",
  COMMENT: "/q",
}
