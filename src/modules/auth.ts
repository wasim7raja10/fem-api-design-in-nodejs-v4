import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = async (password: string, hash: string) => {
	const match = await bcrypt.compare(password, hash);
	return match;
};

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

export const createJWT = (user) => {
	const token = jwt.sign(
		{
			id: user.id,
			username: user.username,
		},
		process.env.JWT_SECRET
	);
	return token;
};

export const protect = (req, res, next) => {
	const bearer = req.headers.authorization;

	if (!bearer) {
		res.status(401).json({ error: "not authorized" });
		return;
	}

	const [_, token] = bearer.split(" ");

	if (!token) {
		res.status(401).json({ error: "invalid token" });
		return;
	}

	try {
		const user = jwt.verify(token, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ error: "incorrect bearer" });
		return;
	}
};
