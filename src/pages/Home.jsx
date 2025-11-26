import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Typography, Carousel, Flex, message, Divider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { getProductList } from "../utils/services";
import ProductCard from "../components/ProductCard";
const { Title, Text } = Typography;

function Home() {
  const navigate = useNavigate();
  const [newProducts, setNewProducts] = useState([]);
  const contentStyle = {
    margin: 0,
    height: "400px",
    width: "100vw",
    color: "white",
    lineHeight: "400px",
    textAlign: "center",
    backgroundColor: "#364d79",
  };
  useEffect(() => {
    getProductList({ headerCategory: "new" }).then((res) => {
      const rawData = res?.data;
      setNewProducts(rawData.dataList.slice(0, 6));
    });
  }, []);
  return (
    <div className="h-screen relative">
      <Carousel autoplay className="h-full">
        {[1, 2, 3, 4].map((i) => (
          <div>
            <h3 style={contentStyle}>模特图{i}</h3>
          </div>
        ))}
      </Carousel>
      <div className="absolute top-40 left-10">
        <Title style={{ color: "white" }}>
          欢迎来到<span className="underline">公司名字</span>
        </Title>
        <Flex gap="middle">
          <Button
            shape="round"
            style={{
              border: "1px solid black",
            }}
            onClick={() => message.info("非功能按钮")}
          >
            关于公司
          </Button>
          <Button
            shape="round"
            style={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
            }}
            onClick={() => navigate("/listing")}
          >
            立即购买
          </Button>
        </Flex>
      </div>
      <div className="p-8 bg-white">
        <Flex justify="space-between">
          <Title level={3}>新近商品</Title>
          <span
            className="-translate-x-2 hover:translate-x-0 hover:underline transition cursor-pointer"
            onClick={() => navigate("/listing/new")}
          >
            查看更多 <ArrowRightOutlined />
          </span>
        </Flex>
        {newProducts.length > 0 ? (
          <div className="grid auto-cols-[minmax(200px,1fr)] grid-flow-col overflow-x-auto scrollbar-hide">
            {newProducts.map((item) => (
              <ProductCard key={item.id} productItem={item} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
