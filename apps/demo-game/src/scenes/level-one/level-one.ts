import { Scene } from "excalibur";
import { Resources } from "../../resources";

/**
 * Managed scene
 */
export class LevelOne extends Scene {
  public onInitialize(/*engine: Engine*/) {
    const tm = Resources.map.getTileMap();
    this.add(tm);
  }
  // public onActivate() {}
  // public onDeactivate() {}
}
