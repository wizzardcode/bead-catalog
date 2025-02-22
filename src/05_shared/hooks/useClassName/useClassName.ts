import classNames from "classnames"

export const useClassName = (
  styles: CSSModuleClasses,
  classNameProps: string | undefined,
  args: (string | undefined)[],
) => {
  const cn = classNames(
    { [classNameProps as string]: classNameProps !== undefined },
    ...args.map((arg) => {
      if (arg) return styles[arg]
    }),
  )

  return cn
}
