export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type ItemCategory =
  | "bracelet"
  | "earring"
  | "ring"
  | "tourniquet"
  | "set"
  | "necklace"

export type FilterCategory = {
  label: string
  value: ItemCategory
  src: string
}

export type ItemSpecifications = {
  bead: string | null
  zipper: string | null
  length: number | null
  width: number | null
}

export type CatalogItem = {
  id: number
  imgFolderName: string
  name: string
  category: ItemCategory
  price: number
  description: string
  specifications: ItemSpecifications
}

export enum ItemCategoryMap {
  bracelet = "Браслет",
  earring = "Серьги",
  ring = "Кольцо",
  tourniquet = "Жгут",
  set = "Комплект",
  necklace = "Ожерелье",
}
