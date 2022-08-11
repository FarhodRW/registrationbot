import dotenv from 'dotenv'
import mongoose from 'mongoose';
import { Scenes, session, Telegraf } from 'telegraf';
import { SceneNames } from './common/sceneNames';
import { adminHomeScene } from './controller/Admin/adminHome';
import { importExcelScene } from './controller/Admin/importXls';
import { manualInputScene } from './controller/Admin/manualInput';
import { courseScene } from './controller/course';
import { dayScene } from './controller/day';
import { fullNameScene } from './controller/fullname';
import { phoneNumberScene } from './controller/phoneNumber';
import { restartScene } from './controller/restart';
import { submitScene } from './controller/submit';
import { timeScene } from './controller/time';
dotenv.config()



mongoose.connect(process.env.DBURI)
  .then(()=>{console.log('Connected to db')})
  .catch(()=>{console.log('Can not connect to db')})


export const bot = new Telegraf<Scenes.SceneContext>(process.env.TOKEN);

const stage = new Scenes.Stage<Scenes.SceneContext>([
  fullNameScene,
  phoneNumberScene,
  courseScene,
  dayScene,
  timeScene,
  submitScene,
  restartScene,
  adminHomeScene,
  importExcelScene,
  manualInputScene
])

bot.use(session());
bot.use((ctx: any, next) => {
  if (ctx.message && ctx.message.text) {
    console.log(
      ctx.message.text||ctx.message.contact,
      ctx.message.from.id,
      ctx.message.from.username
    );
  }
  next();
});
bot.use(stage.middleware());

bot.use((ctx: any, next) => {
  if(ctx.from.id==Number(process.env.ADMINID)){
    ctx.scene.enter(SceneNames.ADMINHOME)
  }
  else if (ctx.message && ctx.message.text && ctx.message.text !== "/start") {
    ctx.reply("Sessiya tozalandi iltimos ma`lumotlarni boshidan kiriting.");
    ctx.scene.enter(SceneNames.FULLNAME);
  }
  next();
});
bot.start((ctx) => {
  if(ctx.from.id==Number(process.env.ADMINID)||ctx.from.id==Number(process.env.ADMINID2)){
    ctx.scene.enter(SceneNames.ADMINHOME)
  }
  else{
  ctx.scene.enter(SceneNames.FULLNAME)
  }
});


bot.launch();
console.log("Bot has been started");