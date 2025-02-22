export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type ItemGender = "man" | "woman"
export type ItemCategory = "bracelet" | "earring"

export type CatalogItem = {
  id: number
  imgFolderName: string
  name: string
  category: ItemCategory
  price: number
  description: string
  gender: ItemGender
  specifications: {
    bead: string
    zipper: string
    length: number
  }
}
