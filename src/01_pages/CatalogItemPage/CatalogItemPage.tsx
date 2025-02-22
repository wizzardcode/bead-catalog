import { CATALOG } from "@models/catalog"
import { CatalogItem } from "@models/global"
import { UIContainer, UIHeading, UILoader, UIText, useAdaptive } from "@uiKit"
import { CardSlider } from "@widgets/CardSlider"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import styles from "./assets/styles.module.scss"

export const CatalogItemPage: FC = () => {
  const [itemData, setItemData] = useState<CatalogItem | null>(null)
  const urlData = useParams()
  const navigate = useNavigate()
  const { isTablet, isMobile } = useAdaptive()

  useEffect(() => {
    const itemDataConfig = CATALOG.find(
      (item) => item.id === Number(urlData.id),
    )

    if (itemDataConfig) {
      setItemData(itemDataConfig)
    } else {
      navigate("*")
    }
  }, [urlData.id])

  /* Пока грузимся */
  if (itemData === null) return <UILoader color="secondary" size="7xl" />

  return (
    <UIContainer className="animate-onset pb-5" as="main">
      <div className={styles.cardHeader}>
        <CardSlider
          category={itemData.category}
          imgFolderName={itemData.imgFolderName}
        />

        <div className="flex flex-col gap-5">
          <UIHeading
            className="leading-none"
            size={isTablet || isMobile ? "2xl" : "4xl"}
          >
            {itemData.name}
          </UIHeading>

          <div className="flex flex-col gap-2 pl-1">
            <UIHeading as="h2" size="lg">
              Описание:
            </UIHeading>
            <UIText size="md">{itemData.description}</UIText>
            <span className="text-[0.9rem] opacity-50">
              Длина браслета на фото — {itemData.specifications.length} см.
            </span>
          </div>

          <div className="flex flex-col gap-2 pl-1">
            <UIHeading as="h2" size="lg">
              Характеристики:
            </UIHeading>

            <ul>
              <li className="flex justify-between border-b py-2">
                <span>Длина браслета</span>
                <span>Под ваше запястье</span>
              </li>

              <li className="flex justify-between border-b py-2">
                <span>Материал</span>
                <span>{itemData.specifications.bead}</span>
              </li>

              <li className="flex justify-between border-b py-2">
                <span>Застежка</span>
                <span>{itemData.specifications.zipper}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </UIContainer>
  )
}
