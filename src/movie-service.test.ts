import axios from "axios";
import { BehaviorSubject } from "rxjs";
import { moviesByQueryObs } from "./movie-service";

jest.mock("config");
jest.mock("axios");

describe("moviesByQueryObs", () => {
  it("Should not make axios request without subscribing", () => {
    const subject = new BehaviorSubject("Indiana");
    moviesByQueryObs(subject);
    expect(axios.get).toHaveBeenCalledTimes(0);
  });
});
