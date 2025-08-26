/*
  Warnings:

  - You are about to drop the column `spent` on the `Budget` table. All the data in the column will be lost.
  - You are about to alter the column `limit` on the `Budget` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `updatedAt` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Budget" DROP COLUMN "spent",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "limit" SET DATA TYPE INTEGER;
