import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls:string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);
  const onSubmit = handleSubmit((formData: HotelFormData) => {

    
    const formDataToSend = new FormData();
    if(hotel)
    {
        formDataToSend.append("hotelId",hotel._id);
    }
    // create new FormData object and call API
    formDataToSend.append("name", formData.name);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("pricePerNight", formData.pricePerNight.toString());
    formDataToSend.append("starRating", formData.starRating.toString());

    formDataToSend.append("adultCount", formData.adultCount.toString());
    formDataToSend.append("childCount", formData.childCount.toString());

    formData.facilities.forEach((facility, index) => {
      formDataToSend.append(`facilities[${index}]`, facility);
    });

    //[image1.jpd,image2.jpg]
    if(formData.imageUrls)
    {
      formData.imageUrls.forEach((url,index)=>{
        formDataToSend.append(`imageUrls[${index}]`,url);
      })
    }

    for (let i = 0; i < formData.imageFiles.length; i++) {
      formDataToSend.append("imageFiles", formData.imageFiles[i]);
    }
    onSave(formDataToSend);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
