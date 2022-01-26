import request from "supertest";
import app from "../app";
import Context from "./context";

let context: Context;

beforeAll(async () => {
  context = await Context.build();
});

afterAll(async () => {
  await context.close();
});

describe("User's Test", () => {
  const newUser = {
    first_name: "lil",
    last_name: "tecca",
    d_o_b: "1996-03-04",
    email: "i@gmail.com",
    phone_number: "011829088810",
  };
  it("should create a user", async () => {
    const response = await request(app).post("/users").send(newUser);

    const { user } = response.body.data;

    expect(response.status).toBe(201);
    expect(user.first_name).toBe(newUser.first_name);
    expect(user.email).toBe(newUser.email);
    expect(response.body.data).toHaveProperty("balance");
    expect(response.body.data.balance.amount).toBe(5000);
    expect(response.body.data.user.id).toBe(response.body.data.balance.user_id);
  });

  it("should get one user", async () => {
    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe(newUser.email);
  });

  it("should get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it("should update a user", async () => {
    const response = await request(app)
      .put("/users/1")
      .send({ first_name: "updated lil" });

    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
    expect(response.body.data.email).toBe(newUser.email);
  });

  it("should get all balances", async () => {
    const response = await request(app).get("/balance");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it("should get balance by user id", async () => {
    const response = await request(app).get("/balance/user-id/1");

    expect(response.status).toBe(200);
    expect(response.body.data.amount).toBe(5000);
  });

  it("should get balance by user's account number", async () => {
    const response = await request(app).get("/balance/user-id/000000001");

    expect(response.status).toBe(200);
    expect(response.body.data.amount).toBe(5000);
  });

  it("should delete a user", async () => {
    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted");
  });
});
