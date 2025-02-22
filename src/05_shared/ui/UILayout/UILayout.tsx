import { useClassName } from "@hooks"
import { useTheme } from "@uiKit"
import classNames from "classnames"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import styles from "./assets/styles.module.scss"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode | ReactNode[]
}

export const UILayout = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...args } = props
  const { theme } = useTheme()
  const cn = useClassName(styles, className, ["layout"])

  return (
    <div
      className={classNames(cn, { [theme as string]: theme })}
      ref={ref}
      {...args}
    >
      {children}
    </div>
  )
})
