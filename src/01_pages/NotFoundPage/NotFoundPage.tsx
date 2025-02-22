import { UIButton, UIContainer, UIHeading, UIText, useAdaptive } from "@uiKit"
import { FC } from "react"
import { Link } from "react-router"

export const NotFoundPage: FC = () => {
  const { isTablet, isMobile } = useAdaptive()

  return (
    <UIContainer
      as="main"
      className="flex h-[100vh] w-full flex-col items-center justify-center gap-5 text-center"
    >
      <UIHeading
        className="font-bold leading-none"
        size={isTablet || isMobile ? "lg" : "3xl"}
      >
        Ошибка 404. Страница не найдена.
      </UIHeading>

      <UIText size={isTablet || isMobile ? "sm" : "md"}>
        К сожалению, запрашиваемая страница не существует. Возможно, она была
        удалена или вы ошиблись в адресе.
      </UIText>

      <Link to="/">
        <UIButton color="primary">Вернутся на главную</UIButton>
      </Link>
    </UIContainer>
  )
}
