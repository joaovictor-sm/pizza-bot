"use client";

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModeToggle } from './mode-toggle-button';
import { LIMITE_ESTOQUE_BAIXO } from '@/app/api/estoque/route';
import { IsLoading } from './is-loading';

interface Estoque {
  id: number;
  nomeIngrediente: string;
  quantidade: number;
  unidadeMedida: string;
}

interface Pedido {
  id: number;
  itens: { nome: string, quantidade: number }[];
  dataHora: string;
  pedidoCompleto: boolean;
}

export default function Dashboard() {
  const [estoque, setEstoque] = useState<Estoque[]>([]);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [estoqueData, pedidosData] = await Promise.all([loadEstoque(), loadPedidos()]);
      
      console.log('Dados de estoque recebidos:', estoqueData);
      console.log('Pedidos data:', pedidosData);
      
      setEstoque(estoqueData || []);
      setPedidos(pedidosData || []);

    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadEstoque = async () => {
    const response = await fetch('/api/estoque');
    if (!response.ok) throw new Error('Erro ao obter estoque');
    const data = await response.json();
    return data;
  };

  const loadPedidos = async () => {
    const response = await fetch('/api/pedidos');
    if (!response.ok) throw new Error('Erro ao obter pedidos');
    return await response.json();
  };

  const handleError = (error: unknown) => {
    console.error("Erro ao carregar dados:", error);
    setError('Erro desconhecido');
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000); // Atualiza a cada 20 segundos

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <IsLoading />
    );
  }

  if (error) {
    return <div className='font-bold text-xl'>Erro: {error}</div>;
  }

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Dashboard da Pizzaria🍕</CardTitle>
          <ModeToggle />
        </div>      
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="estoque">
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value="estoque">Estoque</TabsTrigger>
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          </TabsList>
          <TabsContent value="estoque">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredientes</TableHead>
                  <TableHead>Quantidade disponível</TableHead>
                  <TableHead>Unidade de medida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estoque.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3}>Nenhum ingrediente disponível.</TableCell>
                  </TableRow>
                ) : (
                  estoque.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.nomeIngrediente}</TableCell>
                      <TableCell>
                        {item.quantidade}
                        {item.quantidade <= LIMITE_ESTOQUE_BAIXO && (
                          <span className='font-bold text-red-400 ml-2'>Estoque baixo!</span>
                        )}
                      </TableCell>
                      <TableCell>{item.unidadeMedida}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="pedidos">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Itens do pedido</TableHead>
                  <TableHead>Data e Hora</TableHead>
                  <TableHead>Situação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pedidos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>Nenhum pedido feito.</TableCell>
                  </TableRow>
                ) : (
                  pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                      <TableCell>{pedido.id}</TableCell>
                      <TableCell>
                        {pedido.itens.map((item, index) => (
                          <span key={index}>
                            {item.nome}: {item.quantidade}
                          </span>
                        ))}
                      </TableCell>
                      <TableCell>{new Date(pedido.dataHora).toLocaleString()}</TableCell>
                      <TableCell>{pedido.pedidoCompleto ? "Completo" : "Incompleto"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
