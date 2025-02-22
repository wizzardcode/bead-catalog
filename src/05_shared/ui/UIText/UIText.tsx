import { useClassName } from "@hooks"
import { UIBaseProps } from "@models/uiKit"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps &
  HTMLAttributes<HTMLParagraphElement> & {
    children: ReactNode | ReactNode[]
  }

export const UIText = forwardRef<HTMLParagraphElement, Props>((props, ref) => {
  const { size = "md", color, children, className, ...args } = props

  const cn = useClassName(styles, className, [
    "text",
    `s-${size}`,
    color && `c-${color}`,
  ])

  return (
    <p className={cn} ref={ref} {...args}>
      {children}
    </p>
  )
})
