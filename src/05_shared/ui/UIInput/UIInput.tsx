import { useClassName } from "@hooks"
import { UIBaseProps, UIScale, UIVariant } from "@models/uiKit"
import { forwardRef, InputHTMLAttributes } from "react"
import styles from "./assets/styles.module.scss"

export type Props = UIBaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    placeholder?: string
    variant?: UIVariant
    rounded?: UIScale
  }

export const UIInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    size = "md",
    color = "primary",
    rounded = "xs",
    placeholder,
    className,
    ...args
  } = props

  const cn = useClassName(styles, className, [
    "input",
    `s-${size}`,
    `c-${color}`,
    `r-${rounded}`,
  ])

  return (
    <input
      className={cn}
      type="text"
      placeholder={placeholder}
      ref={ref}
      {...args}
    />
  )
})
