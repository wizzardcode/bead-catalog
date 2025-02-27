import { CatalogItem, ItemCategory } from "@models/global"

export type FormState = {
  items: CatalogItem[]
  category: ItemCategory | null
}

export const filterCatalogItems = ({ items, category }: FormState) => {
  return items.filter((item) => {
    if (category && item.category !== category) return false

    return true
  })
}
