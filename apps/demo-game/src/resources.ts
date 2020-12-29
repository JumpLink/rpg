import { Texture } from "excalibur";
import { TiledResource } from "@rpg/tiled/src";
import sword from "./images/sword.png";
import testMapData from "./maps/test/test.json";

const testMap = new TiledResource(testMapData);

testMap.imagePathAccessor = (p, tileset) => {
  console.debug("imagePathAccessor", p, tileset);
  // Use absolute path if specified
  if (p.indexOf("/") === 0) {
    return p;
  }

  // Load relative to map path
  const pp = testMap.path.split("/");
  const relPath = pp.concat([]);

  if (pp.length > 0) {
    // remove file part of path
    relPath.splice(-1);
  }
  relPath.push(p);
  return relPath.join("/");
};

testMap.imagePathAccessor = (p, tileset) => {
  console.debug("imagePathAccessor", p, tileset);
  // Use absolute path if specified
  if (p.indexOf("/") === 0) {
    return p;
  }

  // Load relative to map path
  const pp = testMap.path.split("/");
  const relPath = pp.concat([]);

  if (pp.length > 0) {
    // remove file part of path
    relPath.splice(-1);
  }
  relPath.push(p);
  return relPath.join("/");
};

testMap.externalTilesetPathAccessor = (p, tileset) => {
  console.debug("externalTilesetPathAccessor", p, tileset);
  // Use absolute path if specified
  if (p.indexOf("/") === 0) {
    return p;
  }

  // Load relative to map path
  const pp = testMap.path.split("/");
  const relPath = pp.concat([]);

  if (pp.length > 0) {
    // remove file part of path
    relPath.splice(-1);
  }
  relPath.push(p);
  return relPath.join("/");
};

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
const Resources = {
  Sword: new Texture(sword),
  map: testMap,
};

export { Resources };
