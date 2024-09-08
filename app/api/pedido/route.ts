import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { pedido } = await req.json();

    // Valida a estrutura do pedido
    if (!Array.isArray(pedido) || pedido.some((item: { nome: string, quantidade: number }) => typeof item.nome !== 'string' || typeof item.quantidade !== 'number')) {
      return NextResponse.json(
        { success: false, message: 'Estrutura do pedido inválida.' },
        { status: 400 }
      );
    }

    // Extrair ingredientes da mensagem do usuário, que vem do Dify
    const ingredientesPedido = pedido.map((item: { nome: string }) => item.nome);

    // Valida a disponibilidade dos ingredientes no banco de dados
    const ingredientesNaoDisponiveis = [];
    for (const nomeIngrediente of ingredientesPedido) {
      const ingrediente = await prisma.estoque.findUnique({
        where: { nomeIngrediente },
      });

      if (!ingrediente || ingrediente.quantidade <= 0) {
        ingredientesNaoDisponiveis.push(nomeIngrediente);
      }
    }

    if (ingredientesNaoDisponiveis.length > 0) {
      return NextResponse.json(
        { success: false, message: `Ingredientes ${ingredientesNaoDisponiveis.join(', ')} indisponíveis ou insuficientes no estoque.` },
        { status: 400 }
      );
    }

    // Atualiza o estoque conforme o pedido
    for (const item of pedido) {
      const { nome, quantidade } = item;
      await prisma.estoque.update({
        where: { nomeIngrediente: nome },
        data: { quantidade: { decrement: quantidade } },
      });
    }

    // Cria o pedido no banco de dados
    await prisma.pedido.create({
      data: {
        itens: pedido.map(({ nome, quantidade }: { nome: string; quantidade: number }) => ({
          nome,
          quantidade,
        })),
      },
    });

    return NextResponse.json({ success: true, message: 'Pedido confirmado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar o pedido:', error);
    return NextResponse.json(
      { success: false, message: 'Erro ao processar o pedido.' },
      { status: 500 }
    );
  }
}
