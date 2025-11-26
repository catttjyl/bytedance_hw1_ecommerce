import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button, Tag, Typography } from "antd";
const { Text } = Typography;
import { filterVariantByColor } from "../utils/utils";
import { useProductListStore } from "../store/productListStore";

function ProductCard({ productItem }) {
  const [varIndex, setVarIndex] = useState(0);
  const navigate = useNavigate();
  const filters = useProductListStore((s) => s.filters);
  const setCurrSelectedProduct = useProductListStore(
    (s) => s.setCurrSelectedProduct
  );

  useEffect(() => {
    const filteredIdx = filterVariantByColor(productItem.variant, filters);
    setVarIndex(filteredIdx);
  }, [filters]);

  const currVariant = productItem.variant[varIndex];

  // const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="m-4 cursor-pointer">
      <div onClick={() => navigate(`/product/${productItem.id}`)}>
        <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative group">
          <div className="group/img">
            <img
              loading="lazy"
              src={currVariant.img.cover}
              className="absolute w-full h-full object-cover transition opacity-100 group-hover/img:opacity-0 duration-500"
            />
            <img
              loading="lazy"
              src={currVariant.img.showcase[0]}
              className="absolute w-full h-full object-cover transition opacity-0 group-hover/img:opacity-100 duration-500"
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setCurrSelectedProduct(productItem);
            }}
            className="
							absolute right-2 bottom-2 scale-0
							inline-flex items-center overflow-hidden
							bg-white/60 rounded-full
							h-8 max-w-[2rem] hover:max-w-[100px]
							opacity-0 group-hover:opacity-100 group-hover:scale-100
							transition-all duration-200
							group/cart"
          >
            <ShoppingCartOutlined className="p-2" />
            <div
              className="
							translate-x-2 mr-4 whitespace-nowrap 
							group-hover/cart:-translate-x-1 transition duration-300"
            >
              加入购物车
            </div>
          </div>
        </div>
        <p>{productItem.name}</p>¥
        <Text delete={currVariant.isSaled}>{currVariant.originPrice}</Text>
        {currVariant.isSaled ? (
          <Text className="ml-2">{currVariant.actualPrice}</Text>
        ) : null}
      </div>
      <div className="flex gap-2 mt-2">
        {productItem.variant.map((item, idx) => {
          return (
            <Tag
              key={idx}
              className="aspect-square rounded"
              color={item.color}
              style={{ background: idx == varIndex ? item.color : null }}
              variant="outlined"
              onClick={(e) => {
                setVarIndex(idx);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductCard;
