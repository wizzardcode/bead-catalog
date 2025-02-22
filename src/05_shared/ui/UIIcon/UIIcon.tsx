import { useClassName } from "@hooks"
import { UIScale } from "@models/uiKit"
import { FC, FunctionComponent, SVGProps, useEffect, useState } from "react"
import styles from "./assets/styles.module.scss"

type Props = {
  name: string
  size?: UIScale
  className?: string
}

export const UIIcon: FC<Props> = ({
  name,
  className,
  size = "md",
  ...args
}) => {
  const [Icon, setIcon] = useState<FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string
      titleId?: string
      desc?: string
      descId?: string
    }
  > | null>(null)

  const cn = useClassName(styles, className, ["icon", `s-${size}`])

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { default: loadedIcon } = await import(
          `../../../00_app/assets/icons/${name}.svg?react`
        )
        setIcon(() => loadedIcon)
      } catch (error) {
        console.error("Error loading icon:", error)
      }
    }

    loadIcon()
  }, [name])

  if (!Icon) return null

  return <Icon className={cn} {...args} />
}
