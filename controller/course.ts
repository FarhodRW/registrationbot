import { Scenes } from "telegraf";
import { COURSES } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";
import { dayScene } from "./day";

export const courseScene = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.COURSES
  );

courseScene.enter((ctx: any) =>
  
  ctx.reply("Kurslardan birini tanlang: ", { reply_markup: COURSES })
);



courseScene.on("text", async (ctx: any) => {
    try {
      if (ctx.message.text == "🔙 Ortga") {
        courseScene.leave()
        ctx.scene.enter(SceneNames.PHONENUMBER);
        return;
      }
      const isButton = COURSES.keyboard.some((line) => {
        return line.some((item: any) => {
          if (item.text == ctx.message.text)
            ctx.session.course = item.text;
          return item.text == ctx.message.text;
        });
      });
  
      if (!isButton) {
        ctx.reply("Iltimos fanlardan birini tanlang.", {
          reply_markup: COURSES,
        });
        return;
      }
      
      ctx.scene.enter(SceneNames.DAYS)
      courseScene.leave()

    } catch (e) {
      console.log(e);
    }
  });
  


