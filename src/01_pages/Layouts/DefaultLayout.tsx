import { UIContainer, UIHeading, UIIcon } from "@uiKit"
import { FC, Fragment } from "react"
import { Link, Outlet, useLocation } from "react-router"

export const DefaultLayout: FC = () => {
  const location = useLocation()

  return (
    <Fragment>
      <UIContainer as="header" className="flex justify-between py-5">
        {location.pathname.startsWith("/catalog/") && (
          <Link to="/">
            <UIIcon name="arrowBack" size="2xl" />
          </Link>
        )}
        <Link to="/">
          <UIHeading className="text-left font-bold" size="xl">
            Bead Catalog
          </UIHeading>
        </Link>
      </UIContainer>
      <Outlet />
    </Fragment>
  )
}
