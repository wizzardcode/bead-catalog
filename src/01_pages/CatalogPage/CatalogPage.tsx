import { ButtonScroll } from "@entities/ButtonScroll"
import CATALOG from "@models/catalog.json"
import { CatalogItem } from "@models/global"
import { UIContainer, UIHeading } from "@uiKit"
import { Catalog } from "@widgets/Catalog"
import { CatalogFilters } from "@widgets/CatalogFilters"
import { FC, useCallback, useEffect, useRef, useState } from "react"

export const CatalogPage: FC = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(
    CATALOG as CatalogItem[],
  )
  const [catalogViewItems, setCatalogViewItems] = useState<CatalogItem[]>([])
  const [isScrolling, setIsScrolling] = useState(false)
  const currentOffset = useRef(0)
  const offset = 10
  const isLoaded = useRef(false) // Флаг, чтобы избежать двойной инициализации

  /* Функция загрузки новых элементов */
  const loadNewViewItems = useCallback(() => {
    if (currentOffset.current >= catalogItems.length) return

    const newItems = catalogItems.slice(
      currentOffset.current,
      currentOffset.current + offset,
    )

    setCatalogViewItems((prev) => {
      const updatedItems = [...prev, ...newItems]
      sessionStorage.setItem("catalogViewItems", JSON.stringify(updatedItems))
      sessionStorage.setItem(
        "currentOffset",
        String(currentOffset.current + offset),
      )
      return updatedItems
    })

    currentOffset.current += offset
  }, [catalogItems])

  /* Обработчик скролла */
  const handleScroll = useCallback(() => {
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100

    if (scrollPercentage >= 40) {
      setIsScrolling(true)
    } else {
      setIsScrolling(false)
    }

    if (scrollPercentage >= 70) {
      loadNewViewItems()
    }

    // Сохраняем позицию скролла
    sessionStorage.setItem("scrollPosition", String(window.scrollY))
  }, [loadNewViewItems])

  /* Восстановление состояния */
  useEffect(() => {
    if (isLoaded.current) return // Предотвращаем повторную загрузку

    const savedItems = sessionStorage.getItem("catalogViewItems")
    const savedOffset = sessionStorage.getItem("currentOffset")
    const savedScroll = sessionStorage.getItem("scrollPosition")

    if (savedItems) {
      setCatalogViewItems(JSON.parse(savedItems))
      currentOffset.current = savedOffset ? parseInt(savedOffset) : 0
    } else {
      loadNewViewItems()
    }

    isLoaded.current = true

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll))
      }, 10) // Небольшая задержка, чтобы подгрузить контент перед скроллом
    }
  }, [])

  /* Подписка на скролл */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <UIContainer
      className="relative flex flex-col items-center gap-5 pb-5"
      as="main"
    >
      <ButtonScroll isView={isScrolling} />

      <div className="mb-5 flex w-full flex-col gap-5">
        <UIHeading className="text-center" size="2xl">
          Фильтры
        </UIHeading>

        <CatalogFilters
          currentOffset={currentOffset}
          offset={offset}
          setCatalogItems={setCatalogItems}
          setCatalogViewItems={setCatalogViewItems}
        />
      </div>

      <div className="flex w-full flex-col gap-5">
        <UIHeading className="text-center" size="2xl">
          Каталог
        </UIHeading>

        <Catalog items={catalogViewItems} />
      </div>
    </UIContainer>
  )
}
