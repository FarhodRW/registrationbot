import { Scenes } from "telegraf";
import { BackButton } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";


export const fullNameScene = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.FULLNAME
  );

  fullNameScene.enter((ctx) =>
  ctx.reply("Assalomu alaykum. Ism va familyangizni kiriting", { reply_markup: BackButton })
);

fullNameScene.on("text", async (ctx: any) => {
    try {
     
      const full_name = ctx.message.text.split(" ");
  
      if (full_name.length !== 2) {
        ctx.reply("Iltimos ism va familyangizni orada bo`sh joy bilan kiriting.", { reply_markup: { remove_keyboard: true } }  );
        return;
      }
  
      ctx.session.full_name = ctx.message.text;
      ctx.scene.enter(SceneNames.PHONENUMBER);
      fullNameScene.leave();
    } catch (e) {
      console.log(e);
    }
  });