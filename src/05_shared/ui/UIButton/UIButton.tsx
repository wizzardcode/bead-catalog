import { useClassName } from "@hooks"
import { UIBaseProps, UIScale, UIVariant } from "@models/uiKit"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps &
  HTMLAttributes<HTMLButtonElement> & {
    children: ReactNode | ReactNode[]
    variant?: UIVariant
    rounded?: UIScale
    type?: "submit" | "button" | "reset"
  }

export const UIButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const {
    size = "sm",
    variant = "fill",
    rounded = "xs",
    color = "info",
    type = "button",
    children,
    className,
    ...args
  } = props

  const cn = useClassName(styles, className, [
    "button",
    `s-${size}`,
    `v-${variant}`,
    `r-${rounded}`,
    `c-${color}`,
  ])

  return (
    <button className={cn} ref={ref} type={type} {...args}>
      {children}
    </button>
  )
})
