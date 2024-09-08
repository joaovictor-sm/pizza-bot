import { prisma } from '../../lib/prisma'

export const LIMITE_ESTOQUE_BAIXO = 5;

export async function GET() {
  try {
    const estoque = await prisma.estoque.findMany();
    return new Response(JSON.stringify(estoque), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erro ao obter dados do estoque:", error);
    return new Response(JSON.stringify({ error: 'Erro ao obter dados do estoque' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await prisma.$disconnect();
  }
}
