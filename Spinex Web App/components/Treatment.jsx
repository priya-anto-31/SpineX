import React from "react";
import "../App.css";
import pelvictiltImg from "../images/pelvictilt.jpg";
import plankImg from "../images/plank.jpg";
import supermanexerciseImg from "../images/supermanexercise.jpg";
import kneetochestsearchImg from "../images/kneetochestsearch.jpg";
import thoracicextensionImg from "../images/thoracicextension.jpg";
import catcowstretchImg from "../images/catcowstretch.jpg";
import scapularsqueezeImg from "../images/scapularsqueeze.jpg";
import wallangelsImg from "../images/wallangels.jpg";

const Treatment = ({ disorderLabel }) => {
  return (
    <div className="recommendation text-[#28487B]">
      <h1 className="text-3xl font-bold mb-6">Treatment for {disorderLabel}</h1>

      {disorderLabel === "Lordosis" && (
        <>
          <h2>🟢 Recommended Exercises</h2>
          <div className="methods">
            <div className="method">
              <img src={pelvictiltImg} alt="Pelvic Tilt Exercise" />
              <p>
                ✅ <b>Pelvic Tilt:</b> Strengthens the abdominal muscles and
                reduces excessive lower back curvature.
              </p>
              <a
                href="https://youtu.be/u0AJnVg0tcc?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={plankImg} alt="Plank" />
              <p>
                ✅ <b>Plank:</b> Builds core strength and promotes better
                posture for lower back support.
              </p>
              <a
                href="https://youtu.be/pvIjsG5Svck?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={supermanexerciseImg} alt="Superman Exercise" />
              <p>
                ✅ <b>Superman:</b> Strengthens the lower back and glutes to
                help correct lordosis.
              </p>
              <a
                href="https://youtu.be/J9zXkxUAfUA?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={kneetochestsearchImg} alt="Knee-to-Chest Stretch" />
              <p>
                ✅ <b>Knee-to-Chest:</b> Stretches lower back muscles to relieve
                tension and reduce curvature.
              </p>
              <a
                href="https://youtu.be/o8gAyDUh2bs?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>
          </div>
        </>
      )}

      {disorderLabel === "Kyphosis" && (
        <>
          <h2>🟢 Recommended Exercises</h2>
          <div className="methods">
            <div className="method">
              <img
                src={thoracicextensionImg}
                alt="Thoracic Extension on Foam Roller"
              />
              <p>
                ✅ <b>Thoracic Extension:</b> Improves spine flexibility and
                helps reduce upper back rounding.
              </p>
              <a
                href="https://youtu.be/ITWZ-_XWQNo?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={catcowstretchImg} alt="Cat-Cow Stretch" />
              <p>
                ✅ <b>Cat-Cow:</b> Enhances spinal flexibility and builds
                strength in supportive muscles.
              </p>
              <a
                href="https://youtu.be/vuyUwtHl694?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={scapularsqueezeImg} alt="Scapular Squeeze" />
              <p>
                ✅ <b>Scapular Squeeze:</b> Activates upper back muscles to aid
                in posture correction.
              </p>
              <a
                href="https://youtu.be/QN1oZVMMRjE?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>

            <div className="method">
              <img src={wallangelsImg} alt="Wall Angels" />
              <p>
                ✅ <b>Wall Angels:</b> Boosts shoulder mobility and strengthens
                upper back for kyphosis correction.
              </p>
              <a
                href="https://youtu.be/1UU4VvklQ44?feature=shared"
                target="_blank"
                rel="noreferrer"
              >
                Watch Video
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Treatment;
