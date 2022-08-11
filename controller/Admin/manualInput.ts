import { Scenes } from "telegraf";
import { BackButton } from "../../common/keyboard";
import { SceneNames } from "../../common/sceneNames";
import { exportExcelStaff } from "../../dbstaff/excel.staff";

export const manualInputScene  = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.MANUALINPUT
  );

  manualInputScene.enter((ctx: any) => ctx.reply("Sanalarni 01/01/2022-02/02/2022 kabi kiriting: ", {reply_markup: BackButton}))


  manualInputScene.on("text", async (ctx: any) => {
    if (ctx.message.text == "🔙 Ortga") {
        ctx.scene.enter(SceneNames.IMPORTEXCEL);
        manualInputScene.leave()
      return;
    }

    const re = /^\d{4}\/\d{2}\/\d{2}$/
    const dates = ctx.message.text
     const dateFrom = dates.substr(0, 10)
     const dateTo = dates.substr(11,20)
    if (re.test(dateFrom)==false&&re.test(dateTo)==false) {
      ctx.reply("Iltimos 2022/01/01-2022/02/02 formatda kiriting.");
      return;
    }
    const dto = [dateFrom, dateTo]
    console.log(dto);
    
    const data = await exportExcelStaff(dto)
    await ctx.telegram.sendDocument(ctx.chat.id, {source: data})


  })


