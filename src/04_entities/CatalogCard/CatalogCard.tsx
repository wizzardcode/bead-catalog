import { CatalogItem } from "@models/global"
import { FC } from "react"
import { Link } from "react-router"

type Props = CatalogItem

export const CatalogCard: FC<Props> = ({
  category,
  id,
  name,
  price,
  imgFolderName,
}) => {
  return (
    <Link className="w-min" to={`/${id}`}>
      <article
        className="flex h-[500px] w-full flex-col items-center gap-2 overflow-hidden rounded-sm md:max-w-80"
        style={{ border: "1px solid var(--color-primary)" }}
      >
        <img
          className="h-[400px] w-full object-cover object-center transition hover:scale-105 hover:brightness-75"
          src={`/static/img/${category}/${imgFolderName}/0.jpg`}
          alt={name}
        />
        <div className="flex flex-col items-center gap-1 p-5">
          <span>{name}</span>
          <span>{price.toLocaleString("ru")} ₽</span>
        </div>
      </article>
    </Link>
  )
}
