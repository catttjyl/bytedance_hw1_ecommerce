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
import { getProductList, getProductDetail } from "../utils/services";
import { useCartStore } from "../store/cartStore";
import ProductDetailCard from "../components/ProductDetailCard";
import ProductCard from "../components/ProductCard";

function ProductDetailPage() {
  const [detail, setDetail] = useState(null);
  const [relavantPro, setRelavantPro] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // setLoading(true);
    getProductDetail(id)
      .then((res) => {
        const rawData = res?.data;
        setDetail(rawData);
      })
      .catch((err) => {
        message.error("拉取商品详情失败");
      });
    getProductList({ headerCategory: detail?.headerCategory }).then((res) => {
      const rawData = res?.data;
      setRelavantPro(rawData.dataList.slice(0, 5));
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      {detail ? (
        <>
          <ProductDetailCard detail={detail} />
          <div className="p-8">
            <Title level={3}>相似商品</Title>
            {relavantPro.length > 0 ? (
              <div className="grid auto-cols-[minmax(200px,1fr)] grid-flow-col overflow-x-auto scrollbar-hide">
                {relavantPro.map((item) => (
                  <ProductCard key={item.id} productItem={item} />
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div>获取商品信息失败</div>
      )}
    </>
  );
}

export default ProductDetailPage;
