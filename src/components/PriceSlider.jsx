import React, { useEffect, useState } from "react";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import { useProductListStore } from "../store/productListStore";

function PriceSlider() {
  const [lowRange, setLowRange] = useState(1);
  const [highRange, setHighRange] = useState(1000);
  const priceRange = useProductListStore((state) => state.filters.priceRange);
  useEffect(() => {
    // if (priceRange && priceRange.length > 0) {
    const [min, max] = priceRange;
    setLowRange(min ?? 1);
    setHighRange(max ?? 1000);
    // }
  }, [priceRange]);
  const setFilters = useProductListStore((state) => state.setFilters);

  const onChangeLow = (newValue) => {
    setLowRange(newValue);
    setFilters({ priceRange: [newValue, highRange] });
  };
  const onChangeHigh = (newValue) => {
    setHighRange(newValue);
    setFilters({ priceRange: [lowRange, newValue] });
  };
  const onChange = (newValue) => {
    setLowRange(newValue[0]);
    setHighRange(newValue[1]);
  };
  const onChangeComplete = () => {
    setFilters({ priceRange: [lowRange, highRange] });
  };

  return (
    <div>
      <Slider
        range
        min={1}
        max={1000}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
        value={[lowRange, highRange]}
      />
      <div className="flex">
        <InputNumber
          min={1}
          max={highRange}
          value={lowRange}
          onChange={onChangeLow}
          // onBlur={(val) => {
          //   console.log("blur", val);
          // }}
        />
        <InputNumber
          min={lowRange}
          max={1000}
          value={highRange}
          onChange={onChangeHigh}
        />
      </div>
    </div>
  );
}

export default PriceSlider;
