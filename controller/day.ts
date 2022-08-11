import { Scenes } from "telegraf";
import { COURSES, DAYS } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";

export const dayScene = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.DAYS
  );

dayScene.enter((ctx: any) =>
  
  ctx.reply("Kurslardan birini tanlang: ", { reply_markup: DAYS })
);



dayScene.on("text", async (ctx: any) => {
    try {
      if (ctx.message.text == "🔙 Ortga") {
        dayScene.leave()
        ctx.scene.enter(SceneNames.COURSES);
        return;
      }
      const isButton = DAYS.keyboard.some((line) => {
        return line.some((item: any) => {
          if (item.text == ctx.message.text)
            ctx.session.days = item.text;
          return item.text == ctx.message.text;
        });

      });
  
      if (!isButton) {
        ctx.reply("Iltimos kunlarni to'g'ri tanlang.", {
          reply_markup: DAYS,
        });
        return;
      }
       
      ctx.scene.enter(SceneNames.TIMES)
      dayScene.leave()

    } catch (e) {
      console.log(e);
    }
  });
  


