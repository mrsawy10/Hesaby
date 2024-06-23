import { Account, Cart as PrismaCart } from "@prisma/client"; // Import Product type from your application

type Cart = PrismaCart & {
  account: Account;
};
export default Cart;
// export { Cart };
