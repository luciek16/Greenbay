import validateCredentials from "../scripts/validateCredentials";

test("logging in with username longer than 6 chars should return true", () => {
  expect(validateCredentials("iamtester", "iamTestPassword1")).toBe(true);
});

test("logging in with username shorter than 5 chars should return false", () => {
  expect(validateCredentials("test", "iamTestPassword1")).toBe(false);
});

test("logging in with password longer than 8 chars should return true", () => {
  expect(validateCredentials("iamtester", "iamTestPassword1")).toBe(true);
});

test("logging in with password shorter than 8 chars should return false", () => {
  expect(validateCredentials("iamtester", "iamT1")).toBe(false);
});

test("logging in with password that is missing numbers should return false", () => {
  expect(validateCredentials("iamtester", "iamTestPassword")).toBe(false);
});

test("logging in with password that is missing lower case chars should return false", () => {
  expect(validateCredentials("iamtester", "HELLOIAMPASSWORD1")).toBe(false);
});
