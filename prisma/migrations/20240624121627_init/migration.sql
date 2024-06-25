/*
  Warnings:

  - You are about to drop the column `downvote` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `downvote` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `upvote` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "downvote",
DROP COLUMN "upvote";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
DROP COLUMN "downvote",
DROP COLUMN "upvote",
ADD COLUMN     "steps" TEXT[];

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
