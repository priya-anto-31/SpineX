import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";
import { getDatabase, ref as dbRef, get, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const Cobb = ({
  image,
  imageFile,
  handleBack,
  handleGetRecommendation,
  setUploadedFilename,
  uploadedFilename,
}) => {
  const [points, setPoints] = useState([]);
  const imageRef = useRef(null);
  const [angleResult, setAngleResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const IMGBB_API_KEY = "84eb4ed4a7e6bba7b989d8f856757b17";

  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageReady(true);
    }
  }, [image]);

  const handleClick = (event) => {
    if (points.length < 5) {
      const offsetX = 3.5;
      const offsetY = 3.5;
      const x = event.nativeEvent.offsetX - offsetX;
      const y = event.nativeEvent.offsetY - offsetY;
      setPoints([...points, { x, y }]);
    }
  };

  const handleGenerateKeypoints = async () => {
    if (!imageReady || !imageRef.current) {
      console.warn("Image not ready for keypoint scaling");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch("http://localhost:5000/api/segment-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        const keypoints = result.keypoints;
        const img = imageRef.current;

        const displayedWidth = img.clientWidth;
        const displayedHeight = img.clientHeight;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        if (naturalWidth === 0 || naturalHeight === 0) {
          console.warn("Image dimensions not ready");
          return;
        }

        const scaleX = displayedWidth / naturalWidth;
        const scaleY = displayedHeight / naturalHeight;

        const formattedPoints = Object.values(keypoints).map(([x, y]) => ({
          x: x * scaleX,
          y: y * scaleY,
        }));

        setPoints(formattedPoints);
        handleGetRecommendation(); // Optional if you need this right away
      } else {
        console.error("Segmentation failed:", result.error);
      }
    } catch (err) {
      console.error("Error during segmentation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Inside your component
  useEffect(() => {
    if (angleResult) {
      handleDatabase();
    }
  }, [angleResult]);

  const handleCalculate = async (event) => {
    event.preventDefault();
    if (points.length === 5) {
      setShowInstructions(false);
      setIsLoading(true);
      const response = await fetch("/api/cobb-angle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points }),
      });
      const data = await response.json();
      setAngleResult(data);
      setShowResults(true);
      setIsLoading(false);
    }
  };
  const handleDatabase = async () => {
    setUploading(true);
    const database = getDatabase();

    try {
      const userImagesRef = dbRef(database, `users/${user.uid}/images`);
      const snapshot = await get(userImagesRef);
      let lastIndex = 0;

      if (snapshot.exists()) {
        const images = snapshot.val();
        lastIndex = Object.keys(images).length;
      }

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error("ImgBB upload failed!");
      }

      const imageURL = data.data.url;
      const today = new Date();
      const scanDate = today.toISOString().split("T")[0];

      const imageDetails = {
        url: imageURL,
        cobbsAngle: angleResult.max_angle,
        severity: angleResult.severity.split(" ")[0],
        curveType: angleResult.curve_type,
        scanDate: scanDate,
      };

      await update(userImagesRef, { [lastIndex + 1]: imageDetails });

      alert("Details uploaded successfully!");
      // setImage(null);
      // setCobbsAngle("");
      // setSeverity("Mild");
      // setCurveType("C");
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error uploading image: " + error.message);
    }

    setUploading(false);
  };
  const handleReset = () => {
    setPoints([]);
    setAngleResult(null);
    setShowResults(false);
    setShowInstructions(true);
    setIsLoading(false);
  };

  return (
    <div className="mt-80">
      <motion.div
        className="flex flex-row items-center justify-center space-x-20 mb-0"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -50 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {showInstructions ? (
            <h2 className="text-[18px] text-white">
              Click 5 points along the spine.
            </h2>
          ) : (
            angleResult && (
              <motion.h2
                className="text-[18px] text-white font-bold"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Cobb Angle = {angleResult.max_angle}°
              </motion.h2>
            )
          )}
          {image && (
            <div className="relative mt-3">
              <motion.img
                ref={imageRef}
                src={image}
                alt="X-ray"
                className="w-[400px] h-auto border border-gray-300 transition-shadow duration-300 ease-in-out hover:shadow-md hover:border-[#B9CDEE]"
                onClick={handleClick}
                onLoad={() => setImageReady(true)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 bg-red-500 rounded-full"
                  style={{ top: `${point.y}px`, left: `${point.x}px` }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {!showResults && (
          <motion.div
            className="w-[250px] p-4 text-[#B9CDEE]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-lg font-bold text-white">Instructions</h3>
            <p className="text-sm mt-2">
              Click on these points along the spine:
            </p>
            <ul className="mt-2 list-decimal list-inside text-sm">
              <li>
                <strong>Point 1:</strong> Top vertebra center
              </li>
              <li>
                <strong>Point 2:</strong> Top tilt
              </li>
              <li>
                <strong>Point 3:</strong> Mid curvature
              </li>
              <li>
                <strong>Point 4:</strong> Bottom tilt
              </li>
              <li>
                <strong>Point 5:</strong> Bottom vertebra center
              </li>
            </ul>
            <p className="mt-2 text-xs text-gray-300">
              Ensure accurate clicks for best results.
            </p>
            <div className="flex flex-col space-y-2 mt-6">
              <motion.button
                onClick={handleCalculate}
                className={`px-2 py-2 text-[#B9CDEE] rounded-lg ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#28487B] hover:bg-[#4468A6]"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Calculate Cobb Angle"}
              </motion.button>
              <motion.button
                onClick={handleGenerateKeypoints}
                className={`px-2 py-2 text-[#B9CDEE] rounded-lg ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#28487B] hover:bg-[#4468A6]"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                disabled={isLoading}
              >
                Generate Keypoints
              </motion.button>
              <motion.button
                onClick={handleReset}
                className={`px-1 py-2 text-[#B9CDEE] rounded-lg ${
                  isLoading ? "bg-gray-500" : "bg-[#28487B] hover:bg-[#4468A6]"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
              >
                Reset
              </motion.button>
            </div>
          </motion.div>
        )}

        {showResults && angleResult && !angleResult.error && (
          <motion.div
            className="w-[350px] text-[#B9CDEE]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-3 text-[#B9CDEE] -mt-30">
              Results
            </h3>
            <p>
              <span className="text-white">Top Angle: </span>
              {angleResult.top_angle}°
            </p>
            <p>
              <span className="text-white">Bottom Angle: </span>
              {angleResult.bottom_angle}°
            </p>
            <p>
              <span className="text-white">Max Angle: </span>
              {angleResult.max_angle}°
            </p>
            <p>
              <strong>
                <span className="text-white">Curve Type:</span>
              </strong>{" "}
              {angleResult.curve_type}
            </p>
            <p className="font-bold">{angleResult.severity}</p>
            <motion.button
              onClick={handleReset}
              className="px-2 py-3 mt-5 text-[#B9CDEE] rounded-lg bg-[#28487B] hover:bg-[#4468A6]"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
            >
              Calculate Again
            </motion.button>
            <motion.button
              onClick={() => handleGetRecommendation(angleResult.max_angle)}
              className="px-2 py-3 mt-3 text-[#B9CDEE] rounded-lg bg-green-600 hover:bg-green-700"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Treatment Recommendations
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Cobb;
