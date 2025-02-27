import { CatalogItemPage } from "@pages/CatalogItemPage"
import { CatalogPage } from "@pages/CatalogPage"
import { DefaultLayout } from "@pages/Layouts"
import { NotFoundPage } from "@pages/NotFoundPage"
import { createHashRouter } from "react-router"

export const router = createHashRouter([
  /* Основной layout */
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      /* Стартовая страница */
      {
        index: true,
        element: <CatalogPage />,
      },
      /* Страница с карточкой товара */
      {
        path: "/catalog/:id",
        element: <CatalogItemPage />,
      },
    ],
  },
  /* Остальные маршруты вне layout */
  {
    path: "*",
    element: <NotFoundPage />,
  },
])
