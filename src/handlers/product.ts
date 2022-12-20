import prisma from "../db";

export const getProducts = async (req, res) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: req.user.id,
        },
        include: {
            products: true,

        }
    });
    res.json({data: user.products});
}

export const getOneProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.findFirstOrThrow({
        where: {
            id: productId,
            belongsToId: req.user.id,
        },
    });
    res.json({data: product});
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id,
            },
        });
        res.json({data: product});
    } catch (e) {
        e.type = 'input';
        next(e);
    }
}

export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: productId,
                belongsToId: req.user.id,
            }
        },
        data: {
            name: req.body.name,
        },
    });
    res.json({data: product});
}

export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: productId,
                belongsToId: req.user.id,
            }
        },
    });
    res.json({data: product});
}