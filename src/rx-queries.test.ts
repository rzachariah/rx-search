import { TestScheduler } from "rxjs/testing";
import { moviesByQueryObs } from "./rx-queries";
import { of } from "rxjs";

jest.mock("config");
jest.mock("./movie-service", () => ({
  getMoviesObs: () =>
    of(["Indiana Jones", "Indiana Jones and the Temple of Doom"]),
}));

describe("moviesByQueryObs", () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // it("Should not make axios request without subscribing", () => {
  //   const subject = new BehaviorSubject("Indiana");
  //   moviesByQueryObs(subject);
  //   expect(axios.get).toHaveBeenCalledTimes(0);
  // });

  // it("Should not make axios request when source marble is empty", () => {
  //   testScheduler.run((helpers) => {
  //     const { cold, expectObservable } = helpers;
  //     const source$ = cold("a -", { a: "" });
  //     const final$ = moviesByQueryObs(source$);
  //     const expected = "  -";
  //     expectObservable(final$).toBe(expected);
  //   });
  // });

  it("Should not make request when source is less than 3 characters", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold("-a-b-", { a: "I", b: "In" });
      const final$ = moviesByQueryObs(source$);
      const expected = "-----";
      expectObservable(final$).toBe(expected);
    });
  });

  it("Should make request when source is at least 3 characters", () => {
    testScheduler.run((helpers) => {
      const { cold, expectObservable } = helpers;
      const source$ = cold("-a-b-c", { a: "I", b: "In", c: "Ind" });
      const final$ = moviesByQueryObs(source$);
      const expected = "-----z";
      expectObservable(final$).toBe(expected, {
        z: ["Indiana Jones", "Indiana Jones and the Temple of Doom"],
      });
    });
  });
});
