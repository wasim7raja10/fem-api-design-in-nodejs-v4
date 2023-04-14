import prisma from "../db";

// get all updates
export const getUpdates = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((acc, product) => {
		return [...acc, ...product.updates];
	}, []);

	res.json({ data: updates });
};

// get update by id
export const getUpdateById = async (req, res) => {
	const update = await prisma.update.findUnique({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
};

// create update
export const createUpdate = async (req, res) => {
	const product = await prisma.product.findUnique({
		where: {
			id: req.body.id,
		},
	});

	if (!product) {
		// does not belong to user
	}

	const update = await prisma.update.create({
		data: {
			title: req.body.title,
			body: req.body.body,
			product: { connect: { id: product.id } },
		},
	});

	res.json({ data: update });
};

// update update
export const updateUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		return res.json({ message: "nope" });
	}

	const update = await prisma.update.update({
		where: {
			id: req.params.id,
		},
		data: req.body,
	});
	res.json({ data: update });
};

// delete update
export const deleteUpdate = async (req, res) => {
	const products = await prisma.product.findMany({
		where: {
			belongsToId: req.user.id,
		},
		include: {
			updates: true,
		},
	});

	const updates = products.reduce((allUpdates, product) => {
		return [...allUpdates, ...product.updates];
	}, []);

	const match = updates.find((update) => update.id === req.params.id);

	if (!match) {
		// handle this
		return res.json({ message: "nope" });
	}

	const update = await prisma.update.delete({
		where: {
			id: req.params.id,
		},
	});

	res.json({ data: update });
};
