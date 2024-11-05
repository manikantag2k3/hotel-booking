import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotel.js";
import verifyToken from "../middleware/auth.js";
import { Readable } from "stream";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

///api/my-hotels

router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6), // Ensure this matches the field name in the form data
  async (req, res) => {
    try {
      const imageFiles = req.files;
      const newHotel = req.body;

      const imageUrls = await uploadImages(imageFiles);

      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

async function uploadImages(imageFiles) {
  const imageUrls = [];
  for (const file of imageFiles) {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) {
              console.error("Error uploading image to Cloudinary:", error);
              reject(new Error("Failed to upload image"));
            } else {
              resolve(result);
            }
          }
        );
        const readableStream = new Readable();
        readableStream._read = () => {}; // _read is required but you can noop it
        readableStream.push(file.buffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
      });
      imageUrls.push(result.secure_url);
    } catch (error) {
      console.error("Error during image upload:", error);
      throw error;
    }
  }
  return imageUrls;
}

router.get("/", verifyToken, async (req, res) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (e) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (e) {
    console.error("Error fetching hotel:", e);
    res.status(500).json({ message: "Error fetching hotel" });
  }
});

router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles", 6), // Ensure this matches the field name in the form data
  async (req, res) => {
    try {
      const updateHotel = req.body;
      updateHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updateHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      const files = req.files;
      if (files && files.length > 0) {
        const updatedImageUrls = await uploadImages(files);
        hotel.imageUrls = [...updatedImageUrls, ...(hotel.imageUrls || [])];
        await hotel.save();
      } 

      res.status(201).json(hotel);
    } catch (e) {
      console.error("Error updating hotel:", e);
      res.status(500).json({ message: "Error updating hotel" });
    }
  }
);

router.get("/:hotelId", verifyToken, async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
    res.json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Server error" });
  } 
});

export default router;
