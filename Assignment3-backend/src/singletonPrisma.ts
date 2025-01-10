import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static instance: PrismaClient;
    comstructor() {}
    public static getInstance() {
        if(!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient();
        }
        return PrismaSingleton.instance;
    }
}
const prisma = PrismaSingleton.getInstance();
export default prisma;