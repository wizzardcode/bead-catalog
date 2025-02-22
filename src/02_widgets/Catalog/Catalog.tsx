import { CatalogCard } from "@entities/CatalogCard"
import { CatalogItem } from "@models/global"
import { FC } from "react"
import styles from "./assets/styles.module.scss"

type Props = {
  items: CatalogItem[]
}

export const Catalog: FC<Props> = ({ items }) => {
  return (
    <ul className={styles.catalog}>
      {items.map((item) => (
        <li key={item.id}>
          <CatalogCard {...item} />
        </li>
      ))}
    </ul>
  )
}
