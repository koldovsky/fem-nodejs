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
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            belongsToId: req.user.id,
        },
    });
    res.json({ data: update });
}

export const updateUpdate = async (req, res) => {
    const updateId = req.params.id;
    const update = await prisma.update.update({
        where: {
            id_belongsToId: {
                id: updateId,
                belongsToId: req.user.id,
            }
        },
        data: {
            title: req.body.title,
            body: req.body.body,
            status: req.body.status,
        },
    });
    res.json({ data: update });
}

export const deleteUpdate = async (req, res) => {
    const updateId = req.params.id;
    const update = await prisma.update.delete({
        where: {
            id_belongsToId: {
                id: updateId,
                belongsToId: req.user.id,
            }
        },
    });
    res.json({ data: update });
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
