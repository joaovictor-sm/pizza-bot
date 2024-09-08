-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "nomeIngrediente" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "unidadeMedida" TEXT NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "itens" JSONB NOT NULL,
    "dataHora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pedidoCompleto" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_nomeIngrediente_key" ON "Estoque"("nomeIngrediente");
