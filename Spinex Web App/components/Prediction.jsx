import React from "react";
import { motion } from "framer-motion";

// Animation variant (same as Scoliosis.jsx)
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Prediction = ({
  prediction,
  preview,
  handleReUpload,
  handleCalculateCobb,
  handlePostureRecommendation,
}) => {
  console.log("Prediction Data:", prediction);
  console.log("Prediction Label:", prediction.label);

  const showTreatmentButton =
    prediction.label !== "Scoliosis" && prediction.label !== "Normal";

  return (
    <div className="flex flex-row items-center predictionbox mt-24 space-x-10">
      {/* Uploaded Image */}
      {preview && (
        <img
          src={preview}
          alt="Uploaded preview"
          className="w-50 h-50 rounded-lg object-cover img1 mr-20"
        />
      )}

      {/* Prediction Output */}
      <div className="prediction mt-3">
        <h2 className="text-3xl font-bold text-[#28487B]">
          {prediction.label}
        </h2>
        <p className="text-lg mt-2">
          {prediction.label === "Normal"
            ? "The image appears to be normal."
            : `The image indicates the presence of ${prediction.label}.`}
        </p>
        <p className="text-lg mt-2 font-semibold">
          Confidence: {prediction.confidence}%
        </p>

        {/* Re-upload Button */}
        <motion.button
          onClick={handleReUpload}
          className="button mt-8 px-4 py-2 bg-[#28487B] text-[#B9CDEE] rounded-lg hover:bg-[#4468A6]"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Re-upload
        </motion.button>

        {/* Scoliosis: Show Cobb angle button */}
        {prediction.label === "Scoliosis" && (
          <motion.button
            onClick={handleCalculateCobb}
            className="ml-4 mt-8 px-4 py-2 bg-[#28487B] text-[#B9CDEE] rounded-lg hover:bg-[#4468A6]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Calculate Cobb Angle
          </motion.button>
        )}

        {/* Other disorders: Show treatment recommendation button */}
        {showTreatmentButton && (
          <motion.button
            onClick={() => handlePostureRecommendation(prediction.label)}
            className="ml-4 mt-8 px-4 py-2 bg-[#28487B] text-[#B9CDEE] rounded-lg hover:bg-[#4468A6]"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Get Treatment Recommendation
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Prediction;
