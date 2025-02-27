import CATALOG from "@models/catalog.json"
import { CatalogItem, FilterCategory, ItemCategory } from "@models/global"
import { UIButton } from "@uiKit"
import classNames from "classnames"
import { FC, RefObject, useEffect, useState } from "react"
import styles from "./assets/styles.module.scss"
import { filterCatalogItems } from "./utils"

type Props = {
  setCatalogItems: (value: CatalogItem[]) => void
  setCatalogViewItems: (value: CatalogItem[]) => void
  currentOffset: RefObject<number>
  offset: number
}

const filterCards: FilterCategory[] = [
  {
    label: "Браслеты",
    value: "bracelet",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
  {
    label: "Серьги",
    value: "earring",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
  {
    label: "Кольца",
    value: "ring",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
  {
    label: "Жгуты",
    value: "tourniquet",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
  {
    label: "Колье",
    value: "necklace",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
  {
    label: "Комплекты",
    value: "set",
    src: "/bead-catalog/static/img/bracelet/kasanie-astariona/0.jpg",
  },
]

const scrollToCatalog = () => {
  const catalogEl = document.getElementById("catalog")

  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: "smooth" })
  }
}

export const CatalogFilters: FC<Props> = ({
  setCatalogItems,
  setCatalogViewItems,
  currentOffset,
  offset,
}) => {
  const [categoryValue, setCategoryValue] = useState<ItemCategory | null>(null)

  const onFilterClick = (item: FilterCategory) => {
    if (item.value === categoryValue) return

    setCategoryValue(item.value)
    scrollToCatalog()
    sessionStorage.setItem("activeFilter", item.value)
  }

  const clearFilter = () => {
    if (categoryValue === null) return
    sessionStorage.removeItem("activeFilter")
    setCategoryValue(null)
    scrollToCatalog()
  }

  const handleFilter = () => {
    const filteredItems = categoryValue
      ? filterCatalogItems({
          category: categoryValue,
          items: CATALOG as CatalogItem[],
        })
      : CATALOG

    setCatalogItems(filteredItems as CatalogItem[])
    setCatalogViewItems(filteredItems.slice(0, offset) as CatalogItem[])
  }

  useEffect(() => {
    const activeFilter = sessionStorage.getItem("activeFilter")

    if (activeFilter) {
      setCategoryValue(activeFilter as ItemCategory)
      handleFilter()
    }
  }, [])

  /* Обновление каталога при изменении фильтров */
  useEffect(() => {
    handleFilter()
    currentOffset.current = offset
  }, [categoryValue])

  return (
    <form className="flex flex-col items-center gap-5">
      <ul className="flex w-full flex-wrap justify-center gap-2">
        {filterCards.map((item, index) => (
          <li className={styles.filterItem} key={index}>
            <button
              className={classNames(styles.filterButton, {
                [styles["filterButton--active"]]: categoryValue === item.value,
              })}
              type="button"
              onClick={() => onFilterClick(item)}
            >
              <span className="absolute z-10 text-lg">{item.label}</span>
              <img
                className="aspect-square w-full object-cover object-center transition-transform"
                src={item.src}
              />
              <div className="absolute h-full w-full bg-black opacity-75 transition-opacity" />
            </button>
          </li>
        ))}
      </ul>

      <UIButton
        className="mt-5"
        type="button"
        color="primary"
        variant="fill"
        onClick={clearFilter}
      >
        Сбросить фильтры
      </UIButton>
    </form>
  )
}
