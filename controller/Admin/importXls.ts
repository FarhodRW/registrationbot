import { Scenes } from "telegraf";
import { EXCELLPAGE } from "../../common/keyboard";
import { SceneNames } from "../../common/sceneNames";
import { exportExcelStaff } from "../../dbstaff/excel.staff";
import { getUserNumbersStaff } from "../../dbstaff/user.staff";



export const importExcelScene  = new Scenes.BaseScene<Scenes.SceneContext>(
    SceneNames.IMPORTEXCEL
  );

  importExcelScene.enter((ctx: any) => ctx.reply('Excel faylni yuklab olish uchun, quyidagi buyruqlardan birini tanlang', {reply_markup: EXCELLPAGE}))

  importExcelScene.on("text", async (ctx: any) => {
    try {

        if (ctx.message.text == '🔙 Ortga') {
            ctx.scene.enter(SceneNames.ADMINHOME);
            importExcelScene.leave
            return;
          }
        
        else if(ctx.message.text=='🗒 Oxirgi 7 kun')  {
            
        const data = await exportExcelStaff(7)
        await ctx.telegram.sendDocument(ctx.chat.id, {source: data})
        

        }

        
        else if(ctx.message.text=='🗓 Oxirgi 30 kun')  {
            
            const data = await exportExcelStaff(30)
            await ctx.telegram.sendDocument(ctx.chat.id, {source: data})
                
            
    
            }
        else if(ctx.message.text == '📅 Qo\'lda kiritish'){
            ctx.scene.enter(SceneNames.MANUALINPUT);
            importExcelScene.leave
            return;   
        }


    } catch (error) {
        console.log(error);
        
    }



})

