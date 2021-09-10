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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test123" });
    });

    it("A blog can be created", function () {
      cy.contains("Add a new blog").click();
      cy.get("#title").type("Cypress is great for e2e testing");
      cy.get("#author").type("Test Testing");
      cy.get("#url").type("www.google.com");
      cy.get("#add-blog-button").click();

      cy.get(".blog").contains("Cypress is great for e2e testing");
    });
  });

  describe("When logged in and blog already exists", function () {
    beforeEach(function () {
      cy.login({ username: "test", password: "test123" });
      cy.addBlog({
        title: "Cypress Commands are very useful",
        author: "Test Testing",
        url: "www.google.com",
      });
    });

    it("User can like a blog", function () {
      cy.get(".blog").contains("Cypress Commands are very useful");
      cy.get("#view-button").click();
      cy.get("#like-button").click();
      cy.get("#likes").contains(1);
    });
  });
});
