import { useClassName } from "@hooks"
import { UIBaseProps } from "@models/uiKit"
import { forwardRef, HTMLAttributes } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps & HTMLAttributes<HTMLInputElement>

export const UICheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { size = "md", color = "primary", className, ...args } = props
  const cn = useClassName(styles, className, [
    "checkbox",
    `s-${size}`,
    `c-${color}`,
  ])

  return <input className={cn} type="checkbox" ref={ref} {...args} />
})
