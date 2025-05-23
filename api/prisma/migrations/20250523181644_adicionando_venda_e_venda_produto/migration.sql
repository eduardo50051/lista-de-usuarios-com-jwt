-- CreateTable
CREATE TABLE "Venda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "observacoes" TEXT,
    CONSTRAINT "Venda_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Venda_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VendaProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vendaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "preco_unitario" TEXT NOT NULL,
    CONSTRAINT "VendaProduto_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VendaProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
