import { Scenes } from "telegraf";
import { ADMINHOME } from "../../common/keyboard";
import { SceneNames } from "../../common/sceneNames";
import {getUserNumbersStaff } from "../../dbstaff/user.staff";



export const adminHomeScene  = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.ADMINHOME
  );

  adminHomeScene.enter( async (ctx: any) =>
  
  ctx.reply("Siz admin paneldasiz, quyidagi buyruqlardan birini tanlang: ", { reply_markup: ADMINHOME })
);

adminHomeScene.on("text", async (ctx: any) => {
    try {
        
        if(ctx.message.text=='📉 Userlar soni')  {
            
        const data = await getUserNumbersStaff()

        ctx.reply(`
        
        📗Userlar soni : ${data[0]}

        📒Toq kunlarda: ${data[1]}

        📕Juft kunlarda: ${data[2]}

        `)
        }
        else if(ctx.message.text == '📥 Excel faylni yuklash'){
            ctx.scene.enter(SceneNames.IMPORTEXCEL)
             adminHomeScene.leave()
        }
        else {
            ctx.reply('Iltimos mavjud buyruqlardan birini tanlang')
        }
    } catch (error) {
        console.log(error);
    }
})
