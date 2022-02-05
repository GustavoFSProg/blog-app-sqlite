-- CreateTable
CREATE TABLE "Posts" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "autor" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "views" INTEGER DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Coments" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "post_id" TEXT NOT NULL,
    "coments" TEXT NOT NULL,
    "user_name" TEXT
);
