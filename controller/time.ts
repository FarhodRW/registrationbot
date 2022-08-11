import { Scenes } from "telegraf";
import { COURSES, DAYS, TIMES } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";

export const timeScene = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.TIMES
  );

timeScene.enter((ctx: any) =>
  
  ctx.reply("Kurs vaqtlarini tanlang: ", { reply_markup: TIMES })
);



timeScene.on("text", async (ctx: any) => {
    try {
      if (ctx.message.text == "🔙 Ortga") {
        timeScene.leave()
        ctx.scene.enter(SceneNames.DAYS);
        return;
      }
      const isButton = TIMES.keyboard.some((line) => {
        return line.some((item: any) => {
          if (item.text == ctx.message.text)
            ctx.session.times = item.text;
          return item.text == ctx.message.text;
        });

      });
  
      if (!isButton) {
        ctx.reply("Iltimos vaqtlarni to'g'ri tanlang.", {
          reply_markup: TIMES,
        });
        return;
      }
       
      ctx.session.user_data = `
     ✍️ FIO: ${ctx.session.full_name}

    📞 Telefon raqam: ${ctx.session.phone_number}

    📚 Kurs nomi: ${ctx.session.course}
    
    📅 Kunlaringiz: ${ctx.session.days}
       
    🕐 Vaqtlaringiz: ${ctx.session.times}
    \n
  `;
  console.log(
    ctx.session.full_name,
    ctx.session.phone_number,
    ctx.session.course,
    ctx.session.days,
    ctx.session.times
  );

  ctx.scene.enter(SceneNames.SUBMIT);
  timeScene.leave()

    } catch (e) {
      console.log(e);
    }
  });
  


