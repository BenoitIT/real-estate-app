-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "senderemail" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
