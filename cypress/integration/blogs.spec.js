describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Test Testing",
      username: "test",
      password: "test123",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.get("#login-form");
  });

  describe("Login", function () {
    it("Successful with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test123");
      cy.get("#login-button").click();

      cy.contains("Test Testing");
      cy.contains("Logout");
    });

    it("Fails with invalid credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test321");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password!");
      cy.get(".notification-error").should(
        "have.css",
        "border-color",
        "rgb(255, 0, 0)"
      );
    });
  });
});
