import { GalleryGrid } from "../src/Gallery/GalleryGrid";
import mock1items from "./mockItems.json";
import mock1rows from "./mockRows.json";

describe("GalleryGrid test", () => {
  test("Initialization", () => {
    expect(() => new GalleryGrid({ containerWidth: -100, items: [] })).toThrow(
      new Error("Container width should be positive")
    );
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [{ width: undefined as never as number, height: 100 }],
        })
    ).toThrow(new Error("Items should have 'width' and 'height' properties"));
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          gap: -5,
        })
    ).toThrow(new Error("Gap should be positive"));
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          heightRange: { min: -2, max: 10 },
        })
    ).toThrow(new Error("Height range should be positive"));
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          heightRange: { min: 50, max: 10 },
        })
    ).toThrowError(
      new Error("Height range minimum should be less than maximum")
    );
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          itemRatioRange: { min: -2, max: 10 },
        })
    ).toThrow(new Error("Item ratio range should be positive"));
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          itemRatioRange: { min: 20, max: 10 },
        })
    ).toThrow(new Error("Item ratio range minimum shold be less than maximum"));
    expect(
      () =>
        new GalleryGrid({
          containerWidth: 1000,
          items: [],
          maxColumns: 0,
        })
    ).toThrow(new Error("maxColumns should be greater than 0"));
  });

  describe("Mock", () => {
    const heightRange = { min: 240, max: 340 };
    const grid = new GalleryGrid({
      containerWidth: 1000,
      items: mock1items,
      heightRange: { min: 240, max: 340 },
      itemRatioRange: { min: 0.5, max: 2 },
      enableCrop: true,
      gap: 12,
    });
    const rows = grid.fillRows();
    test("Quantity of items in rows should be equal to original quantity", () => {
      expect(rows.flatMap((r) => r.items).length).toEqual(mock1items.length);
    });
    test("Quantity of rows", () => {
      expect(rows.length).toEqual(mock1rows.length);
    });
    test("Rows heights are equal", () => {
      rows.forEach((r, index) =>
        expect(r.height).toEqual(mock1rows[index].height)
      );
    });
    test("Rows heights are into the range", () => {
      rows.forEach((r) => {
        expect(r.height).toBeGreaterThanOrEqual(heightRange.min);
        expect(r.height).toBeLessThanOrEqual(heightRange.max);
      });
    });
  });
});
