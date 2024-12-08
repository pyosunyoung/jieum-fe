import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const sliderStyle = {
  width: 400,
};

const marks = {
  2: "2",
  4: "4",
  8: "8",
  16: "16",
};

const RecruitSlider = ({ price, setPrice, limitlessRecruitBoolean }) => {
  const handleSliderChange = (value) => {
    setPrice(value); // 슬라이더 값 변경 시 부모로 전달
  };

  return (
    <div style={{ margin: 20 }}>
      {limitlessRecruitBoolean ? (
        <Slider
        disabled={limitlessRecruitBoolean} // 제한 없음 선택 시 슬라이더 비활성화
          style={sliderStyle}
          min={2}
          max={16}
          defaultValue={price}
          marks={marks}
        />
      ) : (
        <Slider
          style={sliderStyle}
          min={2}
          max={16}
          defaultValue={price}
          marks={marks}
          dotStyle={{ borderColor: "rgba(160,165,75,255)" }}
          activeDotStyle={{ borderColor: "rgba(141,148,41,255)" }}
          railStyle={{ backgroundColor: "rgba(218,222,170,255)" }}
          trackStyle={{ backgroundColor: "rgba(141,148,41,255)" }}
          onChange={handleSliderChange}
        />
      )}
    </div>
  );
};

export default RecruitSlider;
