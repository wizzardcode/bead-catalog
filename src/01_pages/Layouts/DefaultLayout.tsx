import { UIContainer, UIHeading } from "@uiKit"
import { FC, Fragment } from "react"
import { Link, Outlet } from "react-router"

export const DefaultLayout: FC = () => {
  return (
    <Fragment>
      <UIContainer as="header" className="py-5">
        <Link to="/">
          <UIHeading className="text-left font-bold" size="xl">
            Название канала
          </UIHeading>
        </Link>
      </UIContainer>
      <Outlet />
    </Fragment>
  )
}
