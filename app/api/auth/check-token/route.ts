import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/db";

import bcrypt from "bcrypt";
import { jwtVerify } from "jose";
import getUrl from "@/lib/backend/getImageUrl";

export const POST = async (request: Request) => {
  try {
    let data = await request.json();
    // console.log(data);
    let { token } = data;
    // let { token } = await request.json();

    console.log(`token to verify from api `, token);
    const { payload } = await jwtVerify(
      `${token || ``}`,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    let user = await prisma.user.findFirst({
      where: {
        id: `${payload.id}`,
      },
      include: {
        cart: { include: { account: { include: { game: true, platform: true, seller: true } } } },
        wishList: {
          include: { account: { include: { game: true, platform: true, seller: true } } },
        },
      },
    });
    if (!user) throw Error("User not found");

    const res = await bcrypt.compare(`${payload.password}`, user.password);

    let updatedCart = await getUrl({
      data: user.cart.map((ele) => ele.account),
      key: `accountImg`,
    });

    let updatedWishlist = await getUrl({
      data: user.wishList.map((ele) => ele.account),
      key: `accountImg`,
    });
    // return {
    //   user: {
    //     ...user,
    //     cart: updatedCart,
    //     // wishlist: updatedWishlist ,
    //     wishList: updatedWishlist,
    //   },
    // };

    if (!res) throw new Error(`Invalid Token`);

    return new NextResponse(
      JSON.stringify({
        user: {
          ...user,
          cart: updatedCart,
          // wishlist: updatedWishlist ,
          wishList: updatedWishlist,
        },
      }),
      { status: 200 }
    );
    // console.log(payload);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};
