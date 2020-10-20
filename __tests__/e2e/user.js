const supertest = require("supertest");
const app = require("../../src/app");

const server = supertest(app.server);
const user = {
  email: "tester@teste.com",
  name: "Tester",
  password: "123456abc"
};

describe("/USER", () => {
  it("Should create a user", async done => {
    const res = await server.post("/api/v1/users").send(user);

    expect(res.status).toBe(201);
    expect(res.body.name).toBe(user.name);

    done();
  });

  it("Should fail to create a user with password with less character then 6", async done => {
    const res = await server.post("/api/v1/users").send({
      ...user,
      password: "1234"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");

    done();
  });

  it("Should fail to create a user with password without name", async done => {
    const res = await server.post("/api/v1/users").send({
      ...user,
      name: ""
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");

    done();
  });

  it("Should fail to create a user with password without email", async done => {
    const res = await server.post("/api/v1/users").send({
      ...user,
      email: ""
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");

    done();
  });
});
