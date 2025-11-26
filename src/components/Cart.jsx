import { useCartStore } from "../store/cartStore";
import { InputNumber, Flex, Typography } from "antd";
const { Text } = Typography;

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);

  const sharedProps = {
    mode: "spinner",
    min: 1,
    style: { width: "50%" },
  };

  return (
    <div>
      {cart && cart.length > 0 ? (
        <Flex gap="middle" vertical>
          {cart.map((item) => (
            <Flex key={item.id} gap="middle" justify="space-between">
              <img loading="lazy" src={item.img} className="w-1/3" />
              <Flex vertical justify="space-between">
                <Flex justify="space-between">
                  <Flex vertical>
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">尺码：{item.size}</Text>
                  </Flex>
                  <div>
                    ¥<Text delete={item.isSaled}>{item.originPrice}</Text>
                    {item.isSaled ? (
                      <Text className="ml-2">{item.actualPrice}</Text>
                    ) : null}
                  </div>
                </Flex>
                <Flex justify="space-between">
                  <InputNumber
                    size="small"
                    {...sharedProps}
                    value={item.quantity}
                    onChange={(val) => {
                      updateCartItem(item.id, val);
                    }}
                    variant="filled"
                  />
                  <a
                    onClick={() => {
                      deleteFromCart(item.id);
                    }}
                  >
                    移除
                  </a>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : (
        <span>还未选购任何商品</span>
      )}
    </div>
  );
}

export default Cart;
