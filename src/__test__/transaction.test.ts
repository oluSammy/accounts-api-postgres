import request from "supertest";
import app from "../app";
import Context from "./context";

let context: Context;

beforeAll(async () => {
  context = await Context.build();

  const user1 = {
    first_name: "user",
    last_name: "one",
    d_o_b: "1996-03-04",
    email: "userone@gmail.com",
    phone_number: "011829088810",
  };

  const user2 = {
    first_name: "user",
    last_name: "two",
    d_o_b: "1996-03-04",
    email: "usertwo@gmail.com",
    phone_number: "011829088815",
  };

  await request(app).post("/users").send(user1);
  await request(app).post("/users").send(user2);
});

afterAll(async () => {
  await context.close();
});

describe("transfer", () => {
  it("should transfer funds", async () => {
    const transferData = {
      sender: "0000000001",
      receiver: "0000000002",
      amount: "2000",
      description: "first transfer",
    };
    const response = await request(app).post("/transaction").send(transferData);

    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Transaction created successfully");
    expect(response.body.data.amount).toBe(+transferData.amount);
    expect(response.body.data.sender_acct_no).toBe(transferData.sender);
    expect(response.body.data.receiver_acct_no).toBe(transferData.receiver);
  });

  it("should get balances", async () => {
    const user1Response = await request(app).get("/balance/user-id/000000001");
    const user2Response = await request(app).get("/balance/user-id/000000002");

    console.log(user1Response.body);

    expect(user1Response.status).toBe(200);
    expect(user2Response.status).toBe(200);
    expect(user1Response.body.data.amount).toBe(3000);
    expect(user2Response.body.data.amount).toBe(7000);
    // expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it("should get transactions of a user", async () => {
    const response = await request(app).get("/transaction/0000000001");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBeTruthy();
  });

  it("should get credit transactions of a user", async () => {
    const response = await request(app).get("/transaction/credit/0000000002");


    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.status).toBe("transaction retrieved successfully");
  });

  it("should get debit transactions of a user", async () => {
    const response = await request(app).get("/transaction/debit/0000000001");


    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.status).toBe("transaction retrieved successfully");
  });
});
