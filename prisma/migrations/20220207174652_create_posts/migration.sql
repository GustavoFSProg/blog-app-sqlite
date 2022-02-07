-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Posts" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "autor" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT 'Descrição',
    "likes" INTEGER DEFAULT 0,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Posts" ("_id", "autor", "createdAt", "image", "likes", "text", "title", "views") SELECT "_id", "autor", "createdAt", "image", "likes", "text", "title", "views" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
