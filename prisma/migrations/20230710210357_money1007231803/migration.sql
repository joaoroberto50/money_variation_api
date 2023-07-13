-- CreateTable
CREATE TABLE "Money" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "current_value" REAL NOT NULL,
    "previous_value" REAL NOT NULL,
    "variation" REAL NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Money_name_key" ON "Money"("name");
