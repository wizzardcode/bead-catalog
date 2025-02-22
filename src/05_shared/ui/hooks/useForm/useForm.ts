import { APP_CONFIG } from "@config/appConfig"
import { useState } from "react"

// Тип состояния формы
type FormState<FormData extends Record<string, any>> = {
  [K in keyof FormData]: {
    value: FormData[K]
    error?: string
  }
}

// Типы для валидации
export type ValidationRules<FormData> = {
  [K in keyof FormData]?: {
    required?: boolean
    min?: number
    max?: number
    pattern?: RegExp
  }
}

export const useForm = <FormData extends Record<string, any>>(
  initialData: FormData,
  validationRules?: ValidationRules<FormData>,
) => {
  const [formState, setFormState] = useState<FormState<FormData>>(
    Object.keys(initialData).reduce((acc, key) => {
      acc[key as keyof FormData] = { value: initialData[key as keyof FormData] }
      return acc
    }, {} as FormState<FormData>),
  )

  // Функция для установки значения поля
  const setFieldValue = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setFormState({
      ...formState,
      [key]: { ...formState[key], value },
    })
  }

  // Валидация всех полей при отправке формы
  const validateForm = () => {
    let isValid = true
    const newFormState = { ...formState }

    if (validationRules) {
      // Проверка всех полей по заданным правилам
      Object.keys(validationRules).forEach((key) => {
        const fieldName = key as keyof FormData
        const value = formState[fieldName].value
        const rules = validationRules[fieldName]

        // Проверка обязательности
        if (rules?.required && !value) {
          newFormState[fieldName].error =
            `${APP_CONFIG.formErrorMessages.required}!`
          isValid = false
        }
        // Проверка минимального значения
        else if (rules?.min !== undefined && value < rules.min) {
          newFormState[fieldName].error =
            `${APP_CONFIG.formErrorMessages.min} ${rules.min}!`
          isValid = false
        }
        // Проверка максимального значения
        else if (rules?.max !== undefined && value > rules.max) {
          newFormState[fieldName].error =
            `${APP_CONFIG.formErrorMessages.max}: ${rules.max}!`
          isValid = false
        }
        // Проверка по регулярному выражению (например, для email)
        else if (rules?.pattern && !rules.pattern.test(String(value))) {
          newFormState[fieldName].error =
            `${APP_CONFIG.formErrorMessages.regexp}!`
          isValid = false
        } else {
          newFormState[fieldName].error = undefined // Если ошибки нет, очищаем
        }
      })
    }

    setFormState(newFormState)
    return isValid
  }

  const handleValidate = () => {
    const isValid = validateForm()
    return isValid
  }

  return {
    formState,
    setFieldValue,
    handleValidate,
  }
}
