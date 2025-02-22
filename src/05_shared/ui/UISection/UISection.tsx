import { forwardRef, HTMLAttributes, ReactNode } from "react"

type Props = HTMLAttributes<HTMLElement> & {
  children: ReactNode | ReactNode[]
}

export const UISection = forwardRef<HTMLElement, Props>((props, ref) => {
  const { children, ...args } = props

  return (
    <section ref={ref} {...args}>
      {children}
    </section>
  )
})
