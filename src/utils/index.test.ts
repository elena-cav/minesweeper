import { minesweeper } from ".";

describe("Minesweeper", () => {
  test("Replaces each line with an integer indicating the number of mines adjacent to that spot (two rows)", () => {
    expect(
      minesweeper(["-", "-", "-", "X", "-", "-", "-", "-", "-", "-"], 5)
    ).toEqual(["0", "0", "1", "X", "1", "0", "0", "1", "1", "1"]);
  });
  test("Replaces each line with an integer indicating the number of mines adjacent to that spot (five rows)", () => {
    expect(
      minesweeper(
        [
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "X",
          "X",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "-",
          "X",
        ],
        5
      )
    ).toEqual([
      "0",
      "0",
      "0",
      "0",
      "0",
      "2",
      "2",
      "1",
      "0",
      "0",
      "X",
      "X",
      "1",
      "0",
      "0",
      "2",
      "2",
      "1",
      "1",
      "1",
      "0",
      "0",
      "0",
      "1",
      "X",
    ]);
  });
});
