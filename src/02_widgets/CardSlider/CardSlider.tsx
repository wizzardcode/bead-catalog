import { ItemCategory } from "@models/global"
import { useAdaptive } from "@uiKit"
import { FC } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type Props = {
  category: ItemCategory
  imgFolderName: string
}

export const CardSlider: FC<Props> = ({ category, imgFolderName }) => {
  const { isDesktop } = useAdaptive()
  const imagesArray = [
    `/bead-catalog/static/img/${category}/${imgFolderName}/0.jpg`,
    `/bead-catalog/static/img/${category}/${imgFolderName}/1.jpg`,
    `/bead-catalog/static/img/${category}/${imgFolderName}/2.jpg`,
    `/bead-catalog/static/img/${category}/${imgFolderName}/3.jpg`,
  ]

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={isDesktop}
      loop={true}
      effect="fade"
      modules={[Navigation, Pagination]}
      className="max-h-[1200px] w-full"
    >
      {imagesArray.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Фото товара ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
