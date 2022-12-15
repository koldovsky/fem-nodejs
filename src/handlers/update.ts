import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const updateId = req.params.id;
    const update = await prisma.update.findFirstOrThrow({
        where: {
            id: updateId
        },
    });
    res.json({ data: update });
}

export const createUpdate = async (req, res) => {
    const { productId, title, body, status } = req.body;
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
            belongsToId: req.user.id,
        }
    });

    if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }

    const update = await prisma.update.create({
        data: {
            title,
            body,
            status,
            product: {
                connect: {
                    id: productId,
                }
            }
        },
    });

    res.json({ data: update });
}

export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            Update: true,
        }
    });

    const allUpdates = products.reduce((allUpdates, product) => allUpdates.concat(product.Update)
        , []);

    const update = allUpdates.find(update => update.id === req.params.id);

    if (!update) {
        res.status(404).json({ error: 'Update not found' });
        return;
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({ data: updatedUpdate });
}
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            Update: true,
        }
    });

    const allUpdates = products.reduce((allUpdates, product) => allUpdates.concat(product.Update)
        , []);

    const update = allUpdates.find(update => update.id === req.params.id);

    if (!update) {
        res.status(404).json({ error: 'Update not found' });
        return;
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    });

    res.json({ data: deletedUpdate });
}


export const getUpdates = async (req, res) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            Update: true,
        }
    });

    const allUpdates = product.reduce((allUpdates, product) => allUpdates.concat(product.Update)
        , []);
    res.json({ data: allUpdates });
}
