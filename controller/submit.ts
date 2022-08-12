import {Scenes} from "telegraf";
import {RESTART, SUBMIT} from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";
import { createUserStaff } from "../dbstaff/user.staff";

export const submitScene = new Scenes.BaseScene<Scenes.SceneContext>('submit');

submitScene.enter((ctx: any) => ctx.reply(`Ma'lumotlaringiz to'g'rimi? \n ${ctx.session.user_data}`, {reply_markup: SUBMIT}))



submitScene.on('text', async (ctx: any) => {

    try {
      if (ctx.message.text == '🔙 Ortga') {
        ctx.scene.enter(SceneNames.TIMES);
        submitScene.leave
        return;
      }
      const isButton = SUBMIT.keyboard.some(line => {
        return line.some((item: any) => {
          return item.text == ctx.message.text;
        });
      })
  
      if (!isButton) {
        ctx.reply('Iltimos ma`lumotlaringiz to`g`riligini tasdiqlang yoki tahrirlang.', {reply_markup: SUBMIT});
        return;
      }
      try {
        
        ctx.telegram.sendMessage('-1001678313345', ctx.session.user_data);
        const dto = {
              telegramId: ctx.from.id,
              fullname: ctx.session.full_name,
              number: ctx.session.phone_number,
              course: ctx.session.course,
              days: ctx.session.days,
              times: ctx.session.times
        }

        await createUserStaff(dto)
        // if (ctx.session.has_account)
        // await createOrder(ctx.session.token, ctx);
        // else {
        //   await register(ctx);
        //   ctx.scene.enter('verify-code');
        //   return;
        // }
      } catch (e) {
        ctx.session.user_data = ctx.session.user_data + JSON.stringify(e.payload) + JSON.stringify(e.error);
        ctx.telegram.sendMessage('-1001678313345', ctx.session.user_data);
      }
      await ctx.reply('Ma\'lumotlaringiz qabul qilindi. Siz bilan tez orada bog\'lanamiz.');
      ctx.scene.enter(SceneNames.RESTART);
      submitScene.leave();
    } catch (e) {
      console.log(e);
    }
  
  });