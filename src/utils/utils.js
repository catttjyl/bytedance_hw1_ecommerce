const headerCategory = [
	{
		label: "新上架",
		key: "new",
	},
	{
		label: "男士",
		key: "male",
	},
	{
		label: "女士",
		key: "female",
	},
	{
		label: "生活区",
		key: "lifestyle",
	},
	{
		label: "打折区",
		key: "sale",
	},
];

const detailCategory = [
	{
		label: "上衣",
		value: "tops",
	},
	{
		label: "下装",
		value: "bottoms",
	},
	{
		label: "睡衣",
		value: "sleepwear",
	},
	{
		label: "鞋子",
		value: "shoes",
	},
	{
		label: "配饰",
		value: "accessory",
	},
];

const sortBy = [
	{
		label: "价格（低->高）",
		value: "price_asc",
	},
	{
		label: "价格（高->低）",
		value: "price_desc",
	},
	{
		label: "打折力度（高->低）",
		value: "sales_desc",
	},
];

const sizeOptions = [    
	{ label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
]

// gpt生成
const hexToHSL = (hex) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = d / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}

const getColorCategory = (hex) => {
  const { h, s, l } = hexToHSL(hex);

  // 黑白灰
  if (l < 0.15) return "black";
  if (l > 0.85) return "white";
  if (s < 0.15) return "gray";

  // 彩色（按 Hue 分）
  if (h >= 350 || h < 15) return "red";
  if (h < 45) return "orange";
  if (h < 75) return "yellow";
  if (h < 165) return "green";
  if (h < 195) return "cyan";
  if (h < 255) return "blue";
  if (h < 300) return "purple";
  return "pink";
}

const filterVariantByColor = (variant, filters) => {
	const { headerCategory, colors, priceRange, sort } = filters;
	if (!colors.length && !priceRange.length) {
		if (headerCategory == 'sale') {
			const idx = variant.findIndex(v => v.isSaled);
			return idx;
		}

		let min = Infinity;
		let max = 0;
  	let idx = -1;
		if (sort == "price_asc") {
			console.log('jin')
			variant.forEach((v, i) => {
				if (v.actualPrice < min) {
					min = v.actualPrice;
					idx = i;
				}
			});
			return idx;
		}
		if (sort == "price_desc") {
			variant.forEach((v, i) => {
				if (v.actualPrice > max) {
					max = v.actualPrice;
					idx = i;
				}
			});
			return idx;
		}
		if (sort == "sales_desc") {
			variant.forEach((v, i) => {
				if (v.sales > max) {
					max = v.sales;
					idx = i;
				}
			});
			return idx;
		}
	}
  const idx = variant.findIndex(v => {
		const colorMatch = !colors.length || colors.includes(getColorCategory(v.color));
		const priceMatch = !priceRange.length || (priceRange[0] <= v.actualPrice && v.actualPrice <= priceRange[1])
		return colorMatch && priceMatch;
	});
	
  return idx === -1 ? 0 : idx;
}

export {
	headerCategory,
	detailCategory,
	sortBy,
	sizeOptions,
	hexToHSL,
	getColorCategory,
	filterVariantByColor
}
