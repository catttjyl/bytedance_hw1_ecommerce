import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Button,
  message,
  Pagination,
  Layout,
  Menu,
  Collapse,
  theme,
} from "antd";
const { Sider } = Layout;
import { FilterOutlined } from "@ant-design/icons";
import { getProductList } from "../utils/services";
import { useCartStore } from "../store/cartStore";
import { Content } from "antd/es/layout/layout";
import ProductCard from "../components/ProductCard";
import ColorSelector from "../components/ColorSelector";
import PriceSlider from "../components/PriceSlider";
import FilterSelector from "../components/FilterSelector";
import { useProductListStore } from "../store/productListStore";
import { detailCategory, sortBy, sizeOptions } from "../utils/utils";

function Listing() {
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [screenWidth, setScreenWidth] = useState(() => window.innerWidth);
  const productList = useProductListStore((state) => state.productList);
  const total = useProductListStore((state) => state.totalProduct);
  const page = useProductListStore((state) => state.page);
  const pageSize = useProductListStore((state) => state.pageSize);
  const clearFilter = useProductListStore((state) => state.clearFilter);
  const setPage = useProductListStore((state) => state.setPage);
  const { category } = useParams();

  useEffect(() => {
    setLoading(true);
    const store = useProductListStore.getState();
    const preserveSearch = !category && Boolean(store.filters.searchWord);
    store.resetFiltersForCategory(category ?? null, {
      preserveSearchWord: preserveSearch,
    });
  }, [category]);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCollapsed(screenWidth < 992);
  }, [screenWidth]);

  const items = [
    {
      key: "color",
      label: "颜色",
      children: <ColorSelector />,
    },
    {
      key: "detailCategory",
      label: "种类",
      children: (
        <FilterSelector
          group="detailCategory"
          dataListMap={detailCategory}
          multiple
        />
      ),
    },
    {
      key: "sizes",
      label: "尺码",
      children: (
        <FilterSelector group="sizes" dataListMap={sizeOptions} multiple />
      ),
    },
    {
      key: "priceRange",
      label: "价格范围",
      children: <PriceSlider />,
    },
    {
      key: "sort",
      label: "排序",
      children: <FilterSelector group="sort" dataListMap={sortBy} />,
    },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <div className={`${screenWidth < 992 ? "fixed top-0" : "static"} z-1`}>
        <Sider
          // breakpoint="lg"
          collapsedWidth="0"
          collapsed={collapsed}
          style={{
            background: colorBgContainer,
            overflow: "scroll",
            height: "100vh",
            position: "sticky",
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: "thin",
            scrollbarGutter: "stable",
          }}
        >
          <div className="flex flex-col p-4">
            <span
              className="underline cursor-pointer hover:opacity-70 transition"
              onClick={clearFilter}
            >
              清空条件
            </span>
            <Collapse items={items} ghost />
          </div>
        </Sider>
      </div>
      <Layout>
        {screenWidth < 992 ? (
          <FilterOutlined
            className={`sticky top-2 ${
              collapsed ? "translate-x-0" : "translate-x-50"
            } z-1 p-4 mt-2 rounded-r-md bg-white text-2xl w-min transition`}
            onClick={() => setCollapsed(!collapsed)}
          />
        ) : null}
        <Content className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mb-4">
            {productList && productList.length > 0 ? (
              productList.map((item) => {
                return <ProductCard key={item.id} productItem={item} />;
              })
            ) : (
              <>目前没有任何商品</>
            )}
          </div>
          <Pagination
            total={total}
            showTotal={(total) => `Total ${total} items`}
            defaultPageSize={pageSize}
            defaultCurrent={page}
            align="end"
            onChange={(page, pageSize) => {
              setPage(page, pageSize);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Listing;
