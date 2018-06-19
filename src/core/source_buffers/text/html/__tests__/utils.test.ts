/**
 * Copyright 2015 CANAL+ Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ITimedData } from "../types";
import {
  areNearlyEqual,
  getDataAfter,
  getDataBefore,
  removeDataInfosBetween,
} from "../utils";

describe("HTML Buffer Manager utils - getDataBefore", () => {
  it("should get the right timed data when time is the start of an item", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
    ];

    expect(getDataBefore(timedData, 1)).toEqual([
      { start: 0, end: 1, data },
    ]);
  });

  /* tslint:disable max-line-length */
  it("should get the right timed data when time is between start and end of an item", () => {
  /* tslint:enable max-line-length */
    const data = document.createElement("div");
    const timedData = [
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
    ];

    expect(getDataBefore(timedData, 1.5)).toEqual([
      { start: 0, end: 1, data },
    ]);
  });

  it("should get the right timed data when time is the end of an item", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
    ];

    expect(getDataBefore(timedData, 2)).toEqual([
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
    ]);
  });

  it("should get the right timed data when time is between two timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataBefore(timedData, 2.5)).toEqual([
      { start: 0, end: 1, data },
      { start: 1, end: 2, data },
    ]);
  });

  it("should return empty array when time is before all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataBefore(timedData, 0)).toEqual([]);
  });

  it("should return empty array when time is the start of all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataBefore(timedData, 1)).toEqual([]);
  });

  it("should get the right timed data when time is after all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataBefore(timedData, 4.5)).toEqual([
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ]);
  });

  it("should get the right timed data when time is the end of all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataBefore(timedData, 4)).toEqual([
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ]);
  });

  it("should return empty array if no given timed data", () => {
    const timedData: Array<ITimedData<never>> = [];
    expect(getDataBefore(timedData, 3945)).toEqual([]);
  });
});

describe("HTML Buffer Manager utils - getDataAfter", () => {
  /* tslint:disable max-line-length */
  it("should get the right timed data when time is between start and end of a cue", () => {
  /* tslint:enable max-line-length */
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 2.5)).toEqual([
      { start: 3, end: 4, data },
    ]);
  });

  it("should get the right timed data when time is a cue start", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 2)).toEqual([
      { start: 3, end: 4, data },
    ]);
  });

  it("should return an empty arraywhen time is a cue end", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 3)).toEqual([]);
  });

  /* tslint:disable max-line-length */
  it("should get the right timed data when time is before the start of all timed data", () => {
  /* tslint:enable max-line-length */
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 0)).toEqual([
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ]);
  });

  it("should get the right timed data when time is the start of all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 1)).toEqual([
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ]);
  });

  it("should return an empty array when time is the end of all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 4)).toEqual([]);
  });

  it("should return an empty arraywhen time is after the end of all timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
    ];

    expect(getDataAfter(timedData, 5)).toEqual([]);
  });

  it("should get the right timed data when time is between two timed data", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 4, end: 5, data },
    ];

    expect(getDataAfter(timedData, 3.5)).toEqual([
      { start: 4, end: 5, data },
    ]);
  });

  it("should return an empty array when no timed data is given", () => {
    const timedData : Array<ITimedData<never>> = [];
    expect(getDataAfter(timedData, 1418)).toEqual([]);
  });
});

describe("HTML Buffer Manager utils - areNearlyEqual", () => {
  it("should return false if input number are not nearly equals", () => {
    expect(areNearlyEqual(5, 6)).toBe(false);
  });

  it("should return true if input number are nearly equals", () => {
    expect(areNearlyEqual(5, 5.1)).toBe(true);
  });

  it("should return true if input number are equals", () => {
    expect(areNearlyEqual(5, 5)).toBe(true);
  });
});

describe("HTML Buffer Manager utils - removeDataInfosBetween", () => {
  /* tslint:disable max-line-length */
  it("should remove timed data infos between end of a cue and start of another cue", () => {
  /* tslint:enable max-line-length */
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
      { start: 4, end: 5, data },
      { start: 5, end: 6, data },
    ];

    const segment = {
      start: 1,
      end: 6,
      content: timedData,
    };

    expect(removeDataInfosBetween(segment, 2, 5)).toEqual([
      { content: [{ start: 1, end: 2, data }], start: 1, end: 2 },
      { content: [], start: 5, end: 6 },
    ]);
  });

  /* tslint:disable max-line-length */
  it("should remove timed data infos between middle of a cue and middle of another cue", () => {
  /* tslint:enable max-line-length */
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 2, end: 3, data },
      { start: 3, end: 4, data },
      { start: 4, end: 5, data },
      { start: 5, end: 6, data },
    ];

    const segment = {
      start: 1,
      end: 6,
      content: timedData,
    };

    expect(removeDataInfosBetween(segment, 2.5, 4.5)).toEqual([
      { content: [{ start: 1, end: 2, data }], start: 1, end: 2.5 },
      { content: [{ start: 5, end: 6, data }], start: 4.5, end: 6 },
    ]);
  });

  it("should remove timed data infos between two cue gaps", () => {
    const data = document.createElement("div");
    const timedData = [
      { start: 1, end: 2, data },
      { start: 3, end: 4, data },
      { start: 5, end: 6, data },
    ];

    const segment = {
      start: 1,
      end: 6,
      content: timedData,
    };

    expect(removeDataInfosBetween(segment, 2.5, 4.5)).toEqual([
      { content: [{ start: 1, end: 2, data }], start: 1, end: 2.5 },
      { content: [{ start: 5, end: 6, data }], start: 4.5, end: 6 },
    ]);
  });
});
