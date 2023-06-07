import { describe, it, expect, beforeAll, afterEach } from "vitest";
import request from "supertest";
import app from "../app";
import dbConnection from "../schema/dbConnection.js";
import userModel from "../schema/userSchema.js";
import { hashPassword } from "../hashing";
import bcrypt from "bcryptjs";

describe("Integration tests for API requests", () => {
  // Database connection

  beforeAll(() => {
    dbConnection();
  });

  //Delete the user for testing

  afterEach(async () => {
    await userModel.deleteMany({ name: "Jhon Doe" });
  });

  //User which be used to test the APIs

  const data = {
    name: "Jhon Doe",
    phone: 123,
    email: "get@email.com",
    password: "123abc",
  };

  /*
  This section will test the GET requests
*/

  describe("GET requests", () => {
    // GET all the users in the database
    it("GET /api/users", async () => {
      const { body, statusCode } = await request(app).get("/api/users");

      // Expect the status code to be 200
      expect(statusCode).toBe(200);

      // Expect the response body to be an array containing objects with specific properties
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            phone: expect.any(Number),
            email: expect.any(String),
            password: expect.any(String),
          }),
        ])
      );
    }, 15000);

    //GET a single user by their ID

    it("GET /api/users/:id", async () => {
      const user = await userModel.create(data);

      const { body, statusCode } = await request(app).get(
        `/api/users/${user._id}`
      );

      expect(statusCode).toBe(200);

      //This tell us that the user has been found

      expect(user._id.toString()).toBe(body._id);
    });
  });

  /*  
  This section will test the POST requests
  */

  describe("POST requests", () => {
    it("POST /api/users", async () => {
      const { body, statusCode } = await request(app)
        .post("/api/users")
        .send(data);

      expect(statusCode).toBe(200);

      // Expect the response body to be an object containing specific properties
      expect(body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          phone: expect.any(Number),
          email: expect.any(String),
        })
      );
    });
  });

  /*
  This section will test the PATCH requests
*/

  describe("PATCH requests", () => {
    const noPassData = {
      phone: 456,
      email: "JhonDoe@email.com",
    };

    it("PATCH /api/users/:id -- No Password", async () => {
      const user = userModel.create(data);
      const { body, statusCode } = await request(app)
        .patch(`/api/users/${user._id}`)
        .send(noPassData);

      // Expect the response body to be an object containing specific properties
      expect(body).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          phone: noPassData.phone,
          email: noPassData.email,
        })
      );

      expect(statusCode).toBe(200);
    });
  });

  /*  
  This section will test the DELETE requests
  */

  describe("DELETE requests", () => {
    it("DELETE /api/users/:id", async () => {
      const user = await userModel.create(data);

      const { body, statusCode } = await request(app).delete(
        `/api/users/${user._id}`
      );
      expect(statusCode).toBe(200);
    });
  });
});

/* 
Test if the hashing function works correctly
*/

describe("Hashing password", () => {
  it("A hash must be used on passwords", async () => {
    const password = "12345";

    // Generate the hash of the password
    const hashedPassword = await hashPassword(password);

    // Compare the hash with the original password
    const match = await bcrypt.compare(password, hashedPassword);

    expect(match).toBe(true);
  });
});
