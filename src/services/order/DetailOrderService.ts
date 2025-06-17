import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DetailOrderService{
    async execute({order_id}: DetailRequest){
        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            include:{ //Aqui estou pedindo para incluir nos detalhes do pedido tudo sobre o produto e tudo sobre a mesa, isso porque ambos tem relacao entre uma tabela e outra
                product: true,
                order: true,
            }
        })

        return orders;
    }
}

export {DetailOrderService};