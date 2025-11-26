import { Tag, Popover } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useProductListStore } from "../store/productListStore";

function ColorSelector() {
  const selectedColor = useProductListStore.getState().filters.colors;
  const setFilters = useProductListStore((state) => state.setFilters);
  const colorDef = [
    { key: "red", label: "红色", hex: "#FF0000" },
    { key: "orange", label: "橙色", hex: "#FF8000" },
    { key: "yellow", label: "黄色", hex: "#FFFF00" },
    { key: "green", label: "绿色", hex: "#00FF00" },
    { key: "cyan", label: "青色", hex: "#00FFFF" },
    { key: "blue", label: "蓝色", hex: "#0000FF" },
    { key: "purple", label: "紫色", hex: "#8000FF" },
    { key: "pink", label: "粉色", hex: "#FF00FF" },
    { key: "black", label: "黑色", hex: "#000000" },
    { key: "white", label: "白色", hex: "#FFFFFF" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {colorDef.map((color, idx) => {
        const exist = selectedColor.includes(color.key);
        return (
          <Popover
            key={idx}
            placement="bottom"
            content={color.label}
            className="p-0"
          >
            <Tag
              className="aspect-square rounded cursor-pointer content-center w-6"
              color={color.label == "白色" ? "default" : color.hex}
              style={{
                background: exist ? color.hex : color.hex + "33",
              }}
              variant="outlined"
              onClick={() => {
                let newColors;
                if (exist) {
                  newColors = selectedColor.filter((c) => c != color.key);
                } else {
                  newColors = [...selectedColor, color.key];
                }
                setFilters({ colors: newColors });
              }}
            >
              <CheckOutlined
                style={{
                  color: "white",
                  opacity: `${exist ? "1" : "0"}`,
                  filter: "drop-shadow(0 0 1px rgba(0,0,0,0.8))",
                  padding: "0",
                }}
              />
            </Tag>
          </Popover>
        );
      })}
    </div>
  );
}

export default ColorSelector;
