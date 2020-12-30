import { Texture } from 'excalibur';
import { TiledResource, TilesetManager } from '@excaliburjs/excalibur-tiled';
import sword from './images/sword.png';
import testMapData from './maps/test/test.json';
import tilesetFarmSummer from './tilesets/farm-summer.json';

const testMap = new TiledResource(testMapData);

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
export const Resources = {
  Sword: new Texture(sword),
  map: testMap,
};

export const TestLoadTilesets = () => {
  const tilesets = new TilesetManager();

  // Preload tileset
  tilesets.load({}, tilesetFarmSummer);
};
