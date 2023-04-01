import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res) => {
	const user = await prisma.user.create({
		data: {
			username: req.body.username,
			password: await hashPassword(req.body.password),
		},
	});

	const token = createJWT(user);
	res.json({ token });
};

export const signin = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
		},
	});

	if (!user) {
		res.status(404).json({ error: "user not found" });
		return;
	}

	const match = await comparePassword(req.body.password, user.password)

	if (!match) {
		res.status(401).json({ error: "incorrect password" });
		return;
	}

	const token = createJWT(user);
	res.json({ token });
};
