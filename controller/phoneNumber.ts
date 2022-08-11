import { Scenes } from "telegraf";
import { CONTACT_BUTTON } from "../common/keyboard";
import { SceneNames } from "../common/sceneNames";



export const phoneNumberScene = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.PHONENUMBER
  );

  phoneNumberScene.enter((ctx) =>
  ctx.reply("Telefon raqamingizni kiriting.", {
    reply_markup: CONTACT_BUTTON 
  })
);

phoneNumberScene.on("text", async (ctx: any) => {
    if (ctx.message.text == "🔙 Ortga") {
        ctx.scene.enter(SceneNames.FULLNAME);
        phoneNumberScene.leave()
      return;
    }
    const re = /\+998\d{9}/
    
    if (re.test(ctx.message.text)==false) {
      ctx.reply("Iltimos +998XXXXXXXXX formatda kiriting.");
      return;
    }
    
    ctx.session.phone_number = ctx.message.text;
    ctx.scene.enter(SceneNames.COURSES)
    phoneNumberScene.leave();
    return;
})

phoneNumberScene.on("contact", async (ctx: any) => {
    ctx.session.phone_number =
      ctx.message.contact.phone_number[0] == "+"
        ? ctx.message.contact.phone_number
        : "+" + ctx.message.contact.phone_number;
        
    ctx.scene.enter(SceneNames.COURSES)
    phoneNumberScene.leave();
    return;

})