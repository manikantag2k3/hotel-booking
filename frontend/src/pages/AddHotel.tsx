import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { HotelType } from "../shared/types";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel added successfully", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Failed to add hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  const defaultHotel: HotelType = {
    _id: "",
    userId: "",
    name: "",
    city: "",
    country: "",
    description: "",
    type: "",
    adultCount: 0,
    childCount: 0,
    facilities: [],
    pricePerNight: 0,
    starRating: 0,
    imageUrls: [],
    lastUpdated: new Date(),
    bookings: [],
  };

  return <ManageHotelForm hotel={defaultHotel} onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
