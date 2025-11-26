import Mock from 'mockjs';
import { headerCategory, detailCategory, getColorCategory } from './utils/utils';
const Random = Mock.Random;

const headerCategoryMap = Object.fromEntries(
  headerCategory.map(item => [item.key, item.label])
);
const detailCategoryMap = Object.fromEntries(
  detailCategory.map(item => [item.value, item.label])
);

const products = Mock.mock({
  'list|500': [{
    'id': function() {
			return Random.string('upper', 0, 2) + Random.id() + Random.string('lower', 0, 3)
		},
    'name': '@ctitle(2, 8)',
		'description': '@cparagraph(1, 3)',
		'headerCategory|1': headerCategory.map(i => i.key).slice(0, -1),
		'detailCategory|1': detailCategory.map(i => i.value),
		'size': [() => Random.shuffle(['XS','S','M','L',"XL"]).slice(0, Random.integer(3, 5))],
		'variant|1-3': [{}
			// {
			// 	'skuId': function() {
			// 		return `${Random.string(4)}-${this.color}-${this.size}`
			// 	},
			// 	'color': '@color',
			// 	'size|1': ['XS','S','M','L',"XL"],
    	// 	'img': function() {
			// 		const cover = Random.image("240x280", this.color, `${categoryMap[this.headerCategory]}/${this.detailCategory}`);
			// 		const showcase = Array.from({ length: 3 }, () => Random.image("240x280"))
			// 		return {cover: cover, showcase: showcase}
			// 	},
			// 	'price|20-1000': 1,
			// 	'sales|40-100': function() {
			// 		const num = Random.integer(40, 100);
			// 		return num / 100;
			// 	},
			// }
		]
  }]
}).list

products.forEach(p => {
	p.variant = p.variant.map(v =>{
		const color = Random.color();
		const originPrice = Random.integer(20, 1000);
		const sales = Random.integer(1, 100) / 100;
		const isSaled = 0.4 < sales && sales < 0.9;
		const actualPrice = isSaled ? Math.round(originPrice * sales) : originPrice;
		return {
			color: color,
			img: {
				cover: Random.image("240x280", color, `${headerCategoryMap[p.headerCategory]}/${detailCategoryMap[p.detailCategory]}`),
				showcase: Array.from({ length: 3 }, () => Random.image("240x280"))
			},
			originPrice: originPrice,
			sales: sales,
			isSaled: isSaled,
			actualPrice: actualPrice
		}
	})
})

let cart = [];
console.log('products', products.slice(0,5))

function matchVariant(v, filters) {
	const { headerCategory, colors, priceRange } = filters;
	const categoryMatch = headerCategory != "sale" || v.isSaled; 
	const colorMatch = !colors.length || colors.includes(getColorCategory(v.color));
	const priceMatch = !priceRange.length || (priceRange[0] <= v.actualPrice && v.actualPrice <= priceRange[1]);
	return categoryMatch && colorMatch && priceMatch;
}

Mock.mock(/\/api\/products/, "get", (options) => {
	const url = new URL("http://xxxx.com" + options.url);
  const page = Number(url.searchParams.get("page") || 1);
  const pageSize = Number(url.searchParams.get("pageSize") || 20);

  const priceRange = url.searchParams.getAll("priceRange[]");
  const headerCategory = url.searchParams.get("headerCategory");
	const detailCategory = url.searchParams.getAll("detailCategory[]");
	const colors = url.searchParams.getAll("colors[]");
	const sizes = url.searchParams.getAll("sizes[]");
  const sort = url.searchParams.get("sort");
	const searchWord = url.searchParams.get("searchWord");
	console.log('url', url)
  let filtered = [...products];

  // 筛选大项分类
  if (headerCategory) {
		if (headerCategory == 'sale') {
			filtered = filtered.filter((p) => p.variant.some(v => v.isSaled));
		} else {
    filtered = filtered.filter((p) => p.headerCategory === headerCategory);
		}
  }

	// 筛选小项分类
  if (detailCategory && detailCategory.length > 0) {
		console.log('detailCategory', detailCategory)
    filtered = filtered.filter((p) => detailCategory.includes(p.detailCategory));
  }

	// 筛选价格和颜色
	filtered = filtered.filter((p) => 
		p.variant.some(v => matchVariant(v, {headerCategory, colors, priceRange}))
	);

	if (sizes && sizes.length > 0) {
		filtered = filtered.filter((p) => p.size.some(item => sizes.includes(item)));
	}

	if (searchWord) {
		filtered = filtered.filter((p) => p.name.includes(searchWord));
	}

	// 排序
  if (sort === "price_asc") 
		filtered.sort((a, b) => {
			const minA = Math.min(...a.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.actualPrice));
			const minB = Math.min(...b.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.actualPrice));
			return minA - minB;
		});
  if (sort === "price_desc")
		filtered.sort((a, b) => {
			const maxA = Math.max(...a.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.actualPrice));
			const maxB = Math.max(...b.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.actualPrice));
			return maxB - maxA;
		});
  if (sort === "sales_desc")
		filtered.sort((a, b) => {
			const maxA = Math.max(...a.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.sales));
			const maxB = Math.max(...b.variant.filter(v => matchVariant(v, {headerCategory, colors, priceRange})).map(v => v.sales));
			return maxB - maxA;
		});

  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
	
  return {total: total, dataList: filtered.slice(start, end)};
});

Mock.mock(/\/api\/product\/[\w-]+$/, "get", (options) => {
  const id = options.url.split("/").pop();
  const product = products.find((p) => p.id === id);
  return product;
});

Mock.mock('/api/cart', "get", () => {
	return cart
})

Mock.mock('/api/cart/addItem', "post", (req, _) => {
	const body = JSON.parse(req.body);
	const { id } = body.params;
	const exist = cart.find(item => item.id === id);
	if (exist) {
		cart = cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
	} else {
		cart.push({...body.params})
	}
	return cart
})

Mock.mock(/\/api\/cart\/deleteItem/, "delete", (options) => {
	const id = options.url.split("/").pop();
	console.log("id", id);
	cart = cart.filter(item => item.id != id);
	return cart
})

Mock.mock(/\/api\/cart\/updateItem/, "post", (req, _) => {
	const id = req.url.split("/").pop();
	const body = JSON.parse(req.body);
	const { newVal } = body.params;
	cart = cart.map(item => item.id === id ? { ...item, quantity: newVal } : item);
	return cart
})