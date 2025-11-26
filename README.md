# 字节跳动hw1-拟电商网站

## 代码结构

```javascript
hw1_ecommerce/
  - README.md
  - vite.config.js
  - index.html           
  - src/
    -- Mock.js                        // 模拟后端数据结构和API接口及处理逻辑
    -- components/
        -- Header.jsx                 // 顶部拦（包括logo、商品分类、搜索框、购物车）
        -- Cart.jsx                   // 购物车UI组件
        -- ProductCard.jsx            // 商品缩略图UI组件
        -- ProductDetailCard.jsx      // 商品详情UI组件
        -- ColorSelector.jsx          // 颜色多选框（用于侧边栏过滤）
        -- FilterSelector.jsx         // 单选框（用于侧边栏过滤）
        -- PriceSlider.jsx            // 价格滑动组件（用于侧边栏过滤）
    -- pages/
        -- Home.jsx                   // 主页
        -- Listing.jsx                // 列表页
        -- ProductDetailPage.jsx      // 商品详情页
    -- store/                         // 状态管理库（全局变量）
        -- cartStore.js               // 购物车数据管理
        -- productListStore.js        // 列表页商品数据管理
    -- utils/
        -- services.js                // 集中管理所有API接口
        -- utils.js                   // 工具函数合集
    -- App.jsx                        // 页面Layout
    -- main.jsx                       // 路由介入、嵌套管理
    -- App.css
    -- index.css
```
