import { forwardRef, HTMLAttributes, ReactNode, useEffect } from "react"
import styles from "./assets/styles.module.scss"

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode | ReactNode[]
  isOpen: boolean
  onClose: () => void
}

export const UIModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, isOpen, onClose, ...args } = props

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [isOpen])

  if (!isOpen) return

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div ref={ref} {...args} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
})
