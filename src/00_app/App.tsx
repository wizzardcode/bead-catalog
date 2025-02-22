import { UILayout, UIThemeProvider } from "@uiKit"
import { FC } from "react"
import { RouterProvider } from "react-router"
import { router } from "./plugins/router"

export const App: FC = () => {
  return (
    <UIThemeProvider>
      <UILayout>
        <RouterProvider router={router} />
      </UILayout>
    </UIThemeProvider>
  )
}
