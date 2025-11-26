import React, { useEffect, useState, useMemo } from "react";
import {
  Badge,
  Input,
  Layout,
  Menu,
  Drawer,
  Flex,
  Button,
  Typography,
  message,
  Popover,
} from "antd";
const { Header } = Layout;
const { Text } = Typography;
import { ShoppingCartOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useProductListStore } from "../store/productListStore";
import { headerCategory } from "../utils/utils";
import Cart from "./Cart";
import ProductDetailCard from "./ProductDetailCard";

const myHeader = () => {
  const [currSelect, setCurrSelect] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCartStore((state) => state.cart);
  const cartOpen = useCartStore((state) => state.cartOpen);
  const toggleCartOpen = useCartStore((state) => state.toggleOpen);
  const productCardOpen = useProductListStore((state) => state.productCardOpen);
  const toggleProductCard = useProductListStore(
    (state) => state.toggleProductCard
  );
  const currSelectedProduct = useProductListStore(
    (state) => state.currSelectedProduct
  );

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => {
      const qt = item.quantity ?? 1;
      return sum + item.actualPrice * qt;
    }, 0);
  }, [cart]);

  const productCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const toHomePage = () => {
    setCurrSelect(null);
    navigate("/");
  };
  const toCategory = (e) => {
    setCurrSelect(e.key);
    navigate(`/listing/${e.key}`);
  };
  const onSearch = (val) => {
    useProductListStore.getState().onSearch(val);
    if (!location.pathname.startsWith("/listing")) {
      navigate("/listing");
    }
  };

  return (
    <>
      <Header
        style={{ display: "flex", alignItems: "center", overflow: "hidden" }}
      >
        <div className="cursor-pointer p-2 bg-blue-100" onClick={toHomePage}>
          LogoHere
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={toCategory}
          selectedKeys={[currSelect]}
          items={headerCategory}
          className="min-w-0 flex-1 items-center"
        />
        {/* <Input.Search placeholder="输入搜索" allowClear onSearch={onSearch} /> */}
        <Popover
          content={
            <Input.Search
              placeholder="输入搜索"
              allowClear
              onSearch={onSearch}
            />
          }
          trigger="click"
        >
          <SearchOutlined style={{ color: "white", fontSize: "24px" }} />
        </Popover>
        <div className="pl-5" onClick={toggleCartOpen}>
          <Badge size="small" count={productCount}>
            <ShoppingCartOutlined
              style={{ color: "white", fontSize: "24px" }}
            />
          </Badge>
        </div>
      </Header>
      <Drawer
        title="购物车"
        footer={
          <Flex
            justify="space-between"
            align="center"
            style={{ padding: "10px" }}
          >
            <div>合计</div>
            <div>
              <Text strong>¥{totalPrice}</Text>
              <Button
                className="ml-2"
                onClick={() => message.info("非功能按钮")}
              >
                结算
              </Button>
            </div>
          </Flex>
        }
        closable={{ "aria-label": "Close Button" }}
        onClose={toggleCartOpen}
        open={cartOpen}
      >
        <Cart />
      </Drawer>
      <Drawer
        title="购物车"
        closable={{ "aria-label": "Close Button" }}
        onClose={toggleProductCard}
        open={productCardOpen}
      >
        <ProductDetailCard detail={currSelectedProduct} />
      </Drawer>
    </>
  );
};

export default myHeader;
