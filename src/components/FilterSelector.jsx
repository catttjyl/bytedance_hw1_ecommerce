import { useState } from "react";
import { Checkbox, Radio } from "antd";
const CheckboxGroup = Checkbox.Group;
import { useProductListStore } from "../store/productListStore";

function FilterSelector({ group, dataListMap, multiple }) {
  const filters = useProductListStore((state) => state.filters);
  const checkedValues = filters[group];
  const setFilters = useProductListStore((state) => state.setFilters);

  const onChangeC = (newList) => {
    setFilters({ [group]: newList });
  };
  const onChangeR = (newVal) => {
    setFilters({ [group]: newVal.target.value });
  };
  return (
    <>
      {multiple ? (
        <CheckboxGroup
          options={dataListMap}
          value={checkedValues}
          onChange={onChangeC}
          style={{ display: "grid" }}
        />
      ) : (
        <Radio.Group
          vertical
          onChange={onChangeR}
          value={checkedValues}
          options={dataListMap}
        />
      )}
    </>
  );
}

export default FilterSelector;
