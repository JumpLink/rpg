import { Engine, Loader, DisplayMode, Logger, LogLevel } from 'excalibur';
import { Resources, TestLoadTilesets } from './resources';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player/player';

/**
 * Managed game class
 */
class Game extends Engine {
  protected player: Player;
  protected levelOne: LevelOne;

  constructor() {
    super({ displayMode: DisplayMode.FullScreen });
  }

  public async start() {
    // Create new scene with a player
    this.levelOne = new LevelOne(this);
    this.player = new Player();
    this.levelOne.add(this.player);

    game.add('levelOne', this.levelOne);

    // Automatically load all default resources
    const loader = new Loader(Object.values(Resources));

    TestLoadTilesets();

    return super.start(loader);
  }
}

Logger.getInstance().defaultLevel = LogLevel.Debug;

const game = new Game();
game.start().then(() => {
  game.goToScene('levelOne');
});
