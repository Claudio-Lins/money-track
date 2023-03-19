import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(request: Request) {
  const entries = await prisma.entry.findMany({
    include: {
      categories: true,
      User: true,
    },
    orderBy: {
      createdAt: "asc",
    }
  });
  return NextResponse.json(entries);
}

// POST
// export async function POST(request: Request) {
//   const { amount, type, note, categories, userId } = await request.json();
//   const entry = await prisma.entry.create({
//     data: {
//       amount,
//       type,
//       note,
//       categories: {
//         connect: categories,
//       },
//       User: {
//         connect: {
//           id: String(userId),
//         },
//       },
//     },
//   });
//   return new Response(JSON.stringify(entry));
// }

// PUT
// export async function PUT(request: Request) {
//   const { id, amount, type, note, categories, userId } = await request.json();
//   const entry = await prisma.entry.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       amount,
//       type,
//       note,
//       categories: {
//         connect: categories,
//       },
//       User: {
//         connect: {
//           id: String(userId),
//         },
//       },
//     },
//   });
//   return new Response(JSON.stringify(entry));
// }

// // DELETE
// export async function DELETE(request: Request) {
//   const { id } = await request.json();
//   await prisma.entry.delete({
//     where: {
//       id: Number(id),
//     }
//   });
//   console.log("DELETE");
//   return NextResponse.json({ message: "Entry deleted", });
// }
