import { create } from "zustand";
import { getProductList } from "../utils/services";
import { message } from "antd";

const defaultFilter = {
  detailCategory: [],
  priceRange: [],
  colors: [],
  sizes: [],
  sort: null,
  searchWord: ""
}

export const useProductListStore = create((set, get) => ({
    productList: [],
    headerCategory: null,
    filters: {...defaultFilter},
    totalProduct: 0,
    page: 1,
    pageSize: 20,
    fetchData: () => {
        getProductList({...get().filters, headerCategory: get().headerCategory, page: get().page, pageSize: get().pageSize}).then((res) => {
            const rawData = res?.data;
            set({productList: rawData.dataList, totalProduct: rawData.total});
        })
        .catch((err) => {
            message.error("拉取数据错误");
        });
    },
    setHeaderCategory: (cat) => {
        set({headerCategory: cat});
        get().fetchData();
    },
    setFilters: (params) => {
        set(state => ({
            filters: {...state.filters, ...params},
            page: 1
        }));
        get().fetchData();
    },
    onSearch: (val) => {
        set(state => ({
            filters: {...state.filters, searchWord: val},
            page: 1
        }));
        get().fetchData();
    },
    clearFilter: () => {
        set({filters: {...defaultFilter}, page: 1});
        get().fetchData();
    },
    resetFiltersForCategory: (cat, options = {}) => {
        const preserveSearch = options.preserveSearchWord;
        const currentSearchWord = get().filters.searchWord;
        const newFilters = preserveSearch
            ? {...defaultFilter, searchWord: currentSearchWord}
            : {...defaultFilter};
        set({
            headerCategory: cat,
            filters: newFilters,
            page: 1
        });
        get().fetchData();
    },
    setPage: (page, pageSize) => {
        set({page: page, pageSize: pageSize});
        get().fetchData();
    },
    productCardOpen: false,
    currSelectedProduct: {},
    setCurrSelectedProduct: (productItem) => {
        set({currSelectedProduct: productItem, productCardOpen: true});
    },
    toggleProductCard: () => {
        set((state) => ({ productCardOpen: !state.productCardOpen }));
    },
}));
