# 字节跳动hw1-拟电商网站
> 利用React + Vite搭建的响应式电商商品展示与购物平台 => [Demo](https://jyl-e-commerce.netlify.app/)

## 功能支持
* ### 商品列表+筛选
  * 商品分类展示，包括打折商品
  * 支持按颜色、尺码、细分类项、价格区间等多维度多条件同时筛选
  * 商品缩略图可切换不同颜色的展示图
  * 电脑端hover缩略图可展示不同图片，并支持快速加入购物车
  * 支持搜索框筛选
  * 支持多种排序方式：价格升序 / 降序、打折力度（可拓展）

* ### 商品详情页
  * 支持多规格选择（颜色、尺码）
  * 商品图片轮播展示
  * 支持选择数量，加入购物车

* ### 购物车功能
  * 可增加 / 减少商品数量
  * 支持删除单项商品
  * 购物车图标实时更新计数和商品总价

* ### 响应式、交互式UI管理
  * 适配PC端/平板/手机端
  * 网格布局自适配（电脑5列，平板3-4列，手机2列）
  * Hover动画、渐变、图片懒加载


## 技术栈
工具  | 目的/优点
------------- | -------------
**Vite** | 初始化建构工具，HMR快
**React.js** | 组件框架
**Zustand** | 全局状态管理
**TailwindCss + Acro Design** | 统一UI库 + 支持高自由度样式控制
**Mock.js** | 模拟数据结构，拦截fetch/axios请求，模拟真实API请求
**React Router DOM** | 路由管理
**Axios** | 网络请求管理
  

## 页面展示
### **1. 主页**

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/041c0839-fa4d-422a-b2e4-4376fc9600e8" />

### **2. 列表页+侧边栏筛选**

<img width="800" height="601" alt="image" src="https://github.com/user-attachments/assets/3e614f79-b03b-40a0-94c3-2260ac2eb0dd" />

### **3. 购物车页面**

<img width="800" height="599" alt="image" src="https://github.com/user-attachments/assets/ce90f4b6-c3f2-40be-8513-dfcda4e966de" />

### **4. 详情页**

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/8c50ce3b-3939-4a2d-baba-f5797840022a" />

### **5. 移动端布局**

<img width="250" height="659" alt="image" src="https://github.com/user-attachments/assets/575c4e9e-025f-458f-9a4e-b85cbdb21183" />
<img width="250" height="659" alt="image" src="https://github.com/user-attachments/assets/aebc38b0-6d16-4cf8-a1d6-9a9a54f5924f" />
<img width="250" height="660" alt="image" src="https://github.com/user-attachments/assets/f56e0e78-e166-44e2-9602-2ed75f297f22" />
<img width="250" height="659" alt="image" src="https://github.com/user-attachments/assets/208139f4-0cea-41c1-806a-417fe3be19cc" />
<img width="250" height="659" alt="image" src="https://github.com/user-attachments/assets/b691ebca-eabd-4abe-9b73-a0c96ec4bc69" />


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
