import { useClassName } from "@hooks"
import { UIColors, UIOption, UIScale } from "@models/uiKit"
import { UIIcon } from "@uiKit"
import classNames from "classnames"
import { FC, MouseEvent, useEffect, useState } from "react"
import styles from "./assets/styles.module.scss"

type Props = {
  options: UIOption[]
  title: string
  onChange: (option: UIOption) => void
  color?: UIColors
  menuRounded?: UIScale
  triggerSize?: UIScale
  triggerRounded?: UIScale
}

export const UISelect: FC<Props> = ({
  options,
  title,
  menuRounded = "xs",
  color = "primary",
  triggerRounded = "xs",
  triggerSize = "md",
  onChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const cnWrapper = useClassName(styles, undefined, ["wrapper"])
  const cnMenu = useClassName(styles, undefined, ["menu", `r-${menuRounded}`])
  const cnTrigger = useClassName(styles, undefined, [
    "trigger",
    `s-${triggerSize}`,
    `c-${color}`,
    `r-${triggerRounded}`,
  ])

  const handleToggleMenu = (e: MouseEvent) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleClickMenuButton = (index: number) => {
    setCurrentIndex(index)
    onChange(options[index])
  }

  useEffect(() => {
    const closeMenu = () => {
      setIsOpen(false)
    }

    document.addEventListener("click", closeMenu)

    return () => {
      document.removeEventListener("click", closeMenu)
    }
  }, [])

  return (
    <div className={cnWrapper} onClick={handleToggleMenu}>
      <button className={cnTrigger}>
        {currentIndex !== null ? options[currentIndex].label : title}
        <UIIcon
          className={classNames("transition-transform", {
            "rotate-180": isOpen,
          })}
          size={triggerSize}
          name="arrowDown"
        />
      </button>

      <div className={classNames(cnMenu, { [styles.open]: isOpen })}>
        {options.map((option, index) => (
          <button
            className={classNames(styles.menuButton, styles[`c-${color}`], {
              [styles.active]: index === currentIndex,
            })}
            onClick={() => handleClickMenuButton(index)}
            key={index}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
