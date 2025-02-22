import { CATALOG } from "@models/catalog"
import { CatalogItem, ItemCategory } from "@models/global"
import { UIOption } from "@models/uiKit"
import { UIButton, UIContainer, UIHeading, UISelect } from "@uiKit"
import { Catalog } from "@widgets/Catalog"
import { FC, useEffect, useState } from "react"

const filterOptions: UIOption[] = [
  { label: "Браслеты", value: "bracelet" },
  { label: "Серьги", value: "earring" },
]

export const CatalogPage: FC = () => {
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>(CATALOG)
  const [categoryValue, setCategoryValue] = useState<ItemCategory | null>(null)

  useEffect(() => {
    if (categoryValue) {
      const filteredCatalogItems = CATALOG.filter(
        (item) => item.category === categoryValue,
      )

      if (filteredCatalogItems) {
        setCatalogItems(filteredCatalogItems)
      }
    } else {
      setCatalogItems(CATALOG)
    }
  }, [categoryValue])

  return (
    <UIContainer
      className="animate-onset flex flex-col items-center gap-5 py-5"
      as="main"
    >
      <div className="mb-5 flex w-full flex-col gap-5">
        <UIHeading className="text-center" size="2xl">
          Фильтры
        </UIHeading>

        <form className="flex flex-col items-center gap-2">
          <UISelect
            color="unset"
            menuRounded="unset"
            triggerRounded="unset"
            onChange={(option) =>
              setCategoryValue(option.value as ItemCategory)
            }
            options={filterOptions}
            title="Категория"
          />

          <UIButton
            className="mt-5"
            type="button"
            color="primary"
            variant="fill"
            onClick={() => setCategoryValue(null)}
          >
            Сбросить фильтры
          </UIButton>
        </form>
      </div>

      <div className="flex w-full flex-col gap-5">
        <UIHeading className="text-center" size="2xl">
          Каталог
        </UIHeading>
        <Catalog items={catalogItems} />
      </div>
    </UIContainer>
  )
}
