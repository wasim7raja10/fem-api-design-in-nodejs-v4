import app from "../server";
import supertest from "supertest";

import * as user from "../handlers/user";

const request = supertest(app);

describe("GET /", () => {
	it("should return 200 OK", async () => {
		const response = await request.get("/");
		expect(response.status).toBe(200);
	});
});

describe("user handler", () => {
	it("should return a user", async () => {
		const req = {
			body: {
				username: "test",
				password: "test",
			},
		};
		const res = {
			json({ token }: { token: string }) {
				expect(token).toBeTruthy();
			},
		};

		const newUser = await user.createNewUser(req, res, () => {});
	});
});
