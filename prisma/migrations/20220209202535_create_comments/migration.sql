/*
  Warnings:

  - You are about to drop the column `coments` on the `Coments` table. All the data in the column will be lost.
  - Added the required column `comments` to the `Coments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coments" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "user_name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Coments" ("_id", "post_id", "user_name") SELECT "_id", "post_id", "user_name" FROM "Coments";
DROP TABLE "Coments";
ALTER TABLE "new_Coments" RENAME TO "Coments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
