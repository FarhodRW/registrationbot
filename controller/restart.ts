import { Scenes } from "telegraf";
import { RESTART } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";

export const restartScene = new Scenes.BaseScene<Scenes.SceneContext>('restart');

restartScene.enter((ctx) => ctx.reply('Yana buyurtma bermoqchi bo`lsangiz, quyidagi tugmani bosing', { reply_markup: RESTART }))

restartScene.start(ctx => {
  ctx.scene.enter(SceneNames.FULLNAME);
})

restartScene.hears('Yangi buyurtma berish', ctx => {
  ctx.scene.enter(SceneNames.FULLNAME);
  restartScene.leave();
})