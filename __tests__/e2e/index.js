const supertest = require("supertest");
const app = require("../../src/app");

const server = supertest(app.server);

describe("SERVER", () => {
  it("Should receive server status 200", async (done) => {
    const res = await server.get("/api/v1");
    expect(res.status).toBe(200);

    done();
  });
});

// afterAll(async (done) => {
//   const db = await app.db;
//   await db.connection.close();
//   done();
// });
