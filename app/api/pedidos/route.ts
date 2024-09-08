import { prisma } from '../../lib/prisma'

export async function GET() {
  try {
    const pedidos = await prisma.pedido.findMany();
    return new Response(JSON.stringify(pedidos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erro ao obter dados dos pedidos:", error);
    return new Response(JSON.stringify({ error: 'Erro ao obter dados dos pedidos' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
