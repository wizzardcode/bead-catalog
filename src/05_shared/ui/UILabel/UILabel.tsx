import { useClassName } from "@hooks"
import { UIBaseProps } from "@models/uiKit"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps &
  HTMLAttributes<HTMLLabelElement> & {
    children: ReactNode | ReactNode[]
    title: string
  }

export const UILabel = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { size = "md", color, title, children, className, ...args } = props

  const cn = useClassName(styles, className, [
    "label",
    `s-${size}`,
    color && `c-${color}`,
  ])

  return (
    <label className={cn} ref={ref} {...args}>
      <span>{title}</span>
      {children}
    </label>
  )
})
