const supertest = require("supertest");
const app = require("../../src/app");

const server = supertest(app);
const user = {
  email: "tester@teste.com",
  name: "Tester",
  password: "123456abc"
};

describe("/SESSION", () => {
  beforeAll(async () => {
    await server.post("/users").send(user);
  });

  it("Should receive a JWT token", async done => {
    const res = await server.post("/sessions").send(user);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    done();
  });

  it("Should fail to get a JWT token with wrong password", async done => {
    const res = await server.post("/sessions").send({
      ...user,
      password: "1234"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    done();
  });

  it("Should fail to get a JWT token without email", async done => {
    const res = await server.post("/sessions").send({
      ...user,
      email: ""
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    done();
  });
});
