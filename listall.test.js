const listAll = require("./listall");

test("logs current directory with no argument", () => {
  expect(listAll().length).toBeGreaterThan(0);
});
test("logs current directory with argument", () => {
  expect(listAll(".").length).toBeGreaterThan(0);
});
test("logs child directory", () => {
  expect(listAll("./node_modules").length).toBeGreaterThan(0);
});
test("logs parent directory", () => {
  expect(listAll("..").length).toBeGreaterThan(0);
});
test("throws no such file erorr with bad input", () => {
  expect(() => {
    listAll("bababooey");
  }).toThrowError(/no such file or directory/);
});
