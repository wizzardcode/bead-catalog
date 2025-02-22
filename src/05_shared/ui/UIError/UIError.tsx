import { useClassName } from "@hooks"
import { UIScale } from "@models/uiKit"
import { FC } from "react"
import styles from "./assets/styles.module.scss"

type Props = {
  title: string | undefined
  size?: UIScale
  className?: string
}

export const UIError: FC<Props> = ({ className, size = "md", title }) => {
  const cn = useClassName(styles, className, ["error", `s-${size}`])

  return (
    <div className={cn}>
      <span>{title && title}</span>
    </div>
  )
}
