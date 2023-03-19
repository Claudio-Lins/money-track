import prisma from '../../../lib/prisma'

export async function GET(request: Request) {
  const user = await prisma.user.findMany({
    include: {
      entries: true
    }
  })
  return new Response(JSON.stringify(user))
}
