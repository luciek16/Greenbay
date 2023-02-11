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

function maskify(cc) {
  if (cc.length < 4) {
    return cc;
  }
  let result = "";
  for (let i = 0; i < cc.length; i++) {
    i < cc.length - 4 ? (result += "#") : (result += cc[i]);
  }
  return result;
}
console.log(maskify("4556364607935616"));
console.log(maskify("Pejsek")); // ##jsek

test("should return 1", () => {
  expect(maskify("1")).toBe("1");
});

test("should return ##jsek on Pejsek", () => {
  expect(maskify("Pejsek")).toStrictEqual("##jsek");
});

test("should return #ucie on Lucie", () => {
  expect(maskify("Lucie")).toEqual("#ucie");
});
