import { Texture } from 'excalibur';
import { MapResource } from '@excaliburjs/excalibur-tiled';
import sword from './images/sword.png';
import testMapData from './maps/test/test.json';
import tilesetFarmSummer from './tilesets/farm-summer.json';
import tilesetFarmSummerTexture from './tilesets/farm-summer.png';

const testMap = new MapResource(testMapData);

testMap.resolve = {
  '../../tilesets/farm-summer.json': tilesetFarmSummer,
  'farm-summer.png': tilesetFarmSummerTexture,
};

/**
 * Default global resource dictionary. This gets loaded immediately
 * and holds available assets for the game.
 */
export const Resources = {
  Sword: new Texture(sword),
  map: testMap,
};
