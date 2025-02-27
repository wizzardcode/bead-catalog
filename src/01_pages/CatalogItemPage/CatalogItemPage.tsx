import { CatalogSpecifications } from "@entities/CatalogSpecifications"
import CATALOG from "@models/catalog.json"
import { CatalogItem } from "@models/global"
import { UIContainer, UIHeading, UILoader, UIText, useAdaptive } from "@uiKit"
import { CardSlider } from "@widgets/CardSlider"
import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import styles from "./assets/styles.module.scss"

export const CatalogItemPage: FC = () => {
  const [itemData, setItemData] = useState<CatalogItem | null>(null)
  const urlData = useParams()
  const navigate = useNavigate()
  const { isTablet, isMobile } = useAdaptive()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

    const itemDataConfig = CATALOG.find(
      (item) => item.id === Number(urlData.id),
    )

    if (itemDataConfig) {
      setItemData(itemDataConfig as CatalogItem)
    } else {
      navigate("*")
    }
  }, [urlData.id])

  /* Пока грузимся */
  if (itemData === null)
    return (
      <UIContainer className="flex h-screen w-full items-center justify-center">
        <UILoader color="secondary" size="7xl" />
      </UIContainer>
    )

  return (
    <UIContainer
      className={classNames("animate-onset pb-5", styles.wrapper)}
      as="main"
    >
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

          <div className={styles.watermarkWrapper}>
            {itemData.specifications.length && (
              <span className="text-[0.9rem] opacity-50">
                Длина изделия на фото — {itemData.specifications.length} см.
              </span>
            )}

            {itemData.specifications.width && (
              <span className="text-[0.9rem] opacity-50">
                Ширина изделия на фото — {itemData.specifications.width} см.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 pl-1">
          <UIHeading as="h2" size="lg">
            Характеристики:
          </UIHeading>

          <CatalogSpecifications
            category={itemData.category}
            specifications={itemData.specifications}
          />
        </div>
      </div>
    </UIContainer>
  )
}
