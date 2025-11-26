import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  message,
  Flex,
  Tag,
  Radio,
  InputNumber,
  Carousel,
  Typography,
  Modal,
} from "antd";
const { Title, Text } = Typography;
import { useCartStore } from "../store/cartStore";
import { sizeOptions } from "../utils/utils";

function ProductDetailCard({ detail }) {
  const [varIndex, setVarIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sharedProps = {
    mode: "spinner",
    min: 1,
    style: { width: "40%" },
  };

  useEffect(() => {
    setVarIndex(0);
    setSize(null);
  }, [detail]);

  const currVariant = useMemo(() => {
    return detail.variant[varIndex] ?? null;
  }, [detail, varIndex]);

  const onChangeSize = ({ target: { value } }) => {
    setSize(value);
  };

  const addToCart = useCartStore((state) => state.addToCart);

  const onClickAddItem = () => {
    if (!size) {
      Modal.error({
        title: "加入购物车错误",
        content: "请选择一个尺码",
      });
      return;
    }
    addToCart(detail, size, varIndex, quantity);
  };

  const availableSize = sizeOptions.map((size) => {
    return { ...size, disabled: !detail.size[0].includes(size.value) };
  });

  return (
    <div className="flex flex-col gap-6 md:flex-row p-10">
      <div className="w-full md:w-1/2">
        <Carousel arrows infinite={true}>
          {[currVariant.img.cover, ...currVariant.img.showcase].map((image) => (
            <div className="aspect-[3/4] bg-gray-200 overflow-hidden relative">
              <img
                loading="lazy"
                src={image}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <Flex vertical gap="large" className="lg:w-5/12">
        <div>
          <Title level={2}>{detail.name}</Title>¥
          <Text delete={currVariant.isSaled}>{currVariant.originPrice}</Text>
          {currVariant.isSaled ? (
            <Text className="ml-2">{currVariant.actualPrice}</Text>
          ) : null}
        </div>
        <div>{detail.description}</div>
        <Flex vertical>
          尺码
          <Radio.Group
            options={availableSize}
            onChange={onChangeSize}
            value={size}
            optionType="button"
            buttonStyle="solid"
          />
        </Flex>
        <Flex vertical>
          颜色
          <div className="flex gap-2 mt-2">
            {detail.variant.map((item, idx) => {
              return (
                <Tag
                  key={idx}
                  className="aspect-square rounded w-10 cursor-pointer"
                  color={item.color}
                  style={{
                    backgroundColor: idx == varIndex ? item.color : undefined,
                  }}
                  variant="outlined"
                  onClick={(e) => {
                    setVarIndex(idx);
                  }}
                />
              );
            })}
          </div>
        </Flex>
        <Flex justify="space-between">
          <InputNumber
            size="small"
            {...sharedProps}
            value={quantity}
            onChange={(val) => setQuantity(val)}
            variant="filled"
          />
          <Button onClick={onClickAddItem}>加入购物车</Button>
        </Flex>
      </Flex>
    </div>
  );
}

export default ProductDetailCard;
