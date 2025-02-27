import { ItemCategory, ItemSpecifications } from "@models/global"
import { FC } from "react"

type Props = {
  category: ItemCategory
  specifications: ItemSpecifications
}

enum specificationsLabelMap {
  bead = "Материал",
  zipper = "Застежка",
}

const itemCategoryMap = {
  bracelet: {
    label: "Длина браслета",
    value: "Под ваше запастье",
  },
  ring: {
    label: "Диаметр кольца",
    value: "Под ваш палец",
  },
  tourniquet: {
    label: "Длина жгута",
    value: "Под ваше запастье",
  },
}

export const CatalogSpecifications: FC<Props> = ({
  category,
  specifications,
}) => {
  const categorySpecification =
    itemCategoryMap[category as keyof typeof itemCategoryMap]

  return (
    <ul>
      {categorySpecification && (
        <li className="flex justify-between border-b py-2">
          <span>{categorySpecification.label}</span>
          <span>{categorySpecification.value}</span>
        </li>
      )}

      {Object.keys(specifications).map((key, index) => {
        const item = specifications[key as keyof typeof specifications]
        const label =
          specificationsLabelMap[key as keyof typeof specificationsLabelMap]

        if (item && label) {
          return (
            <li className="flex justify-between border-b py-2" key={index}>
              <span>{label}</span>
              <span className="first-letter:uppercase">{item}</span>
            </li>
          )
        }
      })}
    </ul>
  )
}
