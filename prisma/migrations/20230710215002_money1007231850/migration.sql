/*
  Warnings:

  - Added the required column `date` to the `Money` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Money" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "current_value" REAL NOT NULL,
    "previous_value" REAL NOT NULL,
    "variation" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_Money" ("current_value", "id", "name", "previous_value", "status", "variation") SELECT "current_value", "id", "name", "previous_value", "status", "variation" FROM "Money";
DROP TABLE "Money";
ALTER TABLE "new_Money" RENAME TO "Money";
CREATE UNIQUE INDEX "Money_name_key" ON "Money"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
