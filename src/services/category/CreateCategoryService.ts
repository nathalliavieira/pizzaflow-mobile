import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){
        if(!name || name.trim() === ""){
            throw new Error("Name invalid");
        }

        // Verifica se já existe uma categoria com esse nome (sem considerar maiúsculas/minúsculas)
        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where: {
                name: {
                    equals: name.trim(),
                    mode: "insensitive", // ignora maiúsculas/minúsculas
                },
            },
        });

        if (categoryAlreadyExists) {
            throw new Error("Category already exists.");
        }

        const category = await prismaClient.category.create({
            data:{
                name: name.trim(),
            },
            select:{
                id: true,
                name: true,
            }
        })

        return category;
    }
}

export {CreateCategoryService};