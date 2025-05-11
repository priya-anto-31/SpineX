import React, { useState, useRef } from "react";
import TreatmentRecommendations from "./TreatmentRecommendations";

const PosturePrediction = ({ posturePrediction, preview, handleReUpload }) => {
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [angleResult, setAngleResult] = useState(null);

  const treatmentRef = useRef(null);

  const handleGetRecommendation = () => {
    // You can modify this to compute angle if needed
    const dummyAngle = 22; // Replace this with actual Cobb angle if available
    setAngleResult(dummyAngle);
    setShowRecommendation(true);

    setTimeout(() => {
      treatmentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <>
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
            {posturePrediction.posture}
          </h2>
          <p className="text-lg mt-2">
            {posturePrediction.posture === "Normal"
              ? "The posture appears to be normal, with no abnormalities detected."
              : `The posture indicates the presence of ${posturePrediction.posture}.`}
          </p>
          <p className="text-lg mt-2 font-semibold">
            Confidence: {posturePrediction.confidence}%
          </p>

          {/* Re-upload Button */}
          <button
            onClick={handleReUpload}
            className="button mt-6 px-4 py-2 bg-[#28487B] text-[#B9CDEE] rounded-lg hover:bg-[#4468A6] mr-4"
          >
            Re-upload
          </button>

          {/* Show Treatment Button */}
          {posturePrediction.posture !== "Normal" && (
            <button
              onClick={handleGetRecommendation}
              className="button mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Get Treatment Recommendation
            </button>
          )}
        </div>
      </div>

      {/* Treatment Recommendation */}
      {showRecommendation && (
        <div ref={treatmentRef} className="mt-20 flex justify-center">
          <TreatmentRecommendations angleResult={angleResult} />
        </div>
      )}
    </>
  );
};

export default PosturePrediction;
