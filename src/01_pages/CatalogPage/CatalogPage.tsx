import { ButtonScroll } from "@entities/ButtonScroll"
import CATALOG from "@models/catalog.json"
import { CatalogItem } from "@models/global"
import { UIContainer, UIHeading } from "@uiKit"
import { Catalog } from "@widgets/Catalog"
import { CatalogFilters } from "@widgets/CatalogFilters"
import { FC, useCallback, useEffect, useRef, useState } from "react"

const viewOffset = 10

export const CatalogPage: FC = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(
    CATALOG as CatalogItem[],
  )
  const [catalogViewItems, setCatalogViewItems] = useState<CatalogItem[]>([])
  const [isScrolling, setIsScrolling] = useState(false)
  const currentOffset = useRef(0)

  const loadNewViewItems = useCallback(() => {
    if (currentOffset.current >= catalogItems.length) return

    const newItems = catalogItems.slice(
      currentOffset.current,
      currentOffset.current + viewOffset,
    )

    setCatalogViewItems((prev) => {
      const updatedItems = [...prev, ...newItems]
      return updatedItems
    })

    currentOffset.current += viewOffset
  }, [catalogItems])

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
  }, [loadNewViewItems])

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
          offset={viewOffset}
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
