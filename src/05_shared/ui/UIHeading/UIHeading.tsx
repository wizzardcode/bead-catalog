import { useClassName } from "@hooks"
import { UIBaseProps } from "@models/uiKit"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps &
  HTMLAttributes<HTMLHeadingElement> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    children: ReactNode | ReactNode[]
  }

export const UIHeading = forwardRef<HTMLHeadingElement, Props>((props, ref) => {
  const {
    as: Component = "h1",
    size = "md",
    color,
    children,
    className,
    ...args
  } = props

  const cn = useClassName(styles, className, [
    "heading",
    `s-${size}`,
    color && `c-${color}`,
  ])

  return (
    <Component className={cn} ref={ref} {...args}>
      {children}
    </Component>
  )
})
