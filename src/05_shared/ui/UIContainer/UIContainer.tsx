import { useAdaptive } from "@uiKit"
import classNames from "classnames"
import { FC, HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLElement> & {
  as?: keyof HTMLElementTagNameMap
  children: ReactNode | ReactNode[]
}

export const UIContainer: FC<Props> = ({
  children,
  className,
  as: Component = "div",
  ...args
}) => {
  const { isTablet, isDesktop, isMobile } = useAdaptive()

  return (
    <Component
      className={classNames({
        ["px-20"]: isDesktop,
        ["px-10"]: isTablet,
        ["px-5"]: isMobile,
        [className as string]: className !== undefined,
      })}
      {...args}
    >
      {children}
    </Component>
  )
}
