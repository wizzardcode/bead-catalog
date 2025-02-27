import { UIIcon } from "@uiKit"
import { FC } from "react"

type Props = {
  isView: boolean
}

export const ButtonScroll: FC<Props> = ({ isView }) => {
  if (!isView) return

  return (
    <div
      className="fixed bottom-5 right-5 z-10 cursor-pointer rounded-full bg-white p-5 shadow-md shadow-black"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <UIIcon className="rotate-180" name="arrowDown" size="xl" />
    </div>
  )
}
