import { useClassName } from "@hooks"
import { UIBaseProps } from "@models/uiKit"
import { FC } from "react"
import styles from "./assets/styles.module.scss"

type Props = UIBaseProps

export const UILoader: FC<Props> = ({ color = "primary", size = "md" }) => {
  const cn = useClassName(styles, undefined, [
    "loader",
    `s-${size}`,
    `c-${color}`,
  ])

  return <div className={cn} />
}
