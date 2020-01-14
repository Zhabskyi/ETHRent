const request = require("supertest");
const generateApplication = require("../../application");

describe("Users", () => {
  let app;

  beforeAll(() => {
    app = generateApplication("test");
  });

  afterEach(async () => {
    await request(app).post("/debug/reset");
  });

  afterAll(async () => {
    await app.close();
  });

  test("GET /api/users", async () => {
    await request(app)
      .get("/api/users")
      .expect(200, [
        {
          id: 1,
          first_name: "Alice",
          last_name: "McLoud",
          email: "mcloud@gmail.com",
          password: "123456",
          city: "Calgary",
          address: "street",
          province: "AB",
          postal_code: "T3H5X5",
          phone_number: "4034445566",
          map: "https://maps.googleapis.com/maps"
        },
        {
          id: 2,
          first_name: "John",
          last_name: "Doe",
          email: "doe@gmail.com",
          password: "123456",
          city: "Calgary",
          address: "street",
          province: "AB",
          postal_code: "T3E6XS6",
          phone_number: "4031111111",
          map: "https://maps.googleapis.com/maps"
        }
      ]);
  });

  test("GET /api/users/postal/:postalCode", async () => {
    const postal = 'T3H5X5';
    await request(app)
      .get(`/api/users/postal/${postal}`)
      .expect(200, [
        {
         "id": 1
        }
      ]);
  });

});
