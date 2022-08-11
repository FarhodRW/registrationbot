import { Markup } from "telegraf";


//User keyboards
export const BackButton = Markup.keyboard([
    Markup.button.text('🔙 Ortga')
]).resize().reply_markup;

export let COURSES: any = Markup.keyboard([
    Markup.button.text('Matematika'),
    Markup.button.text('Ona tili va adabiyoti'),
    Markup.button.text('Fizika'),
    Markup.button.text('Ingliz tili'),
    Markup.button.text('🔙 Ortga')
  ], {
    wrap: (btn, index, currentRow) => {
      if (index % 2 && index !== 8 && index !== 9)
        return false;
      else return true;
    }
  }).resize().reply_markup;


  export const CONTACT_BUTTON = Markup.keyboard([
    Markup.button.contactRequest('📞 Kontaktni yuborish.'),
    Markup.button.text('🔙 Ortga')
  ]).resize().reply_markup;

export let DAYS: any = Markup.keyboard([
    Markup.button.text('Toq kunlari (Dush.Chor.Juma)'),
    Markup.button.text('Juft kunlari (Sesh.Paysh.Shanba)'),
    Markup.button.text('🔙 Ortga')
  ]).resize().reply_markup;


  export let TIMES: any = Markup.keyboard([
    Markup.button.text('08:00 - 10:00'),
    Markup.button.text('10:00 - 12:00'),
    Markup.button.text('14:00 - 16:00'),
    Markup.button.text('16:00 - 18:00'),
    Markup.button.text('18:00 - 20:00'),
    Markup.button.text('🔙 Ortga')
  ], {
    wrap: (btn, index, currentRow) => {
      if (index % 2 && index !== 4 && index !== 5)
        return false;
      else return true;
    }
  }).resize().reply_markup;
  
  
  export const SUBMIT = Markup.keyboard([
    Markup.button.text('✅ Tasdiqlash'),
    Markup.button.text('🔙 Ortga')
  ]).resize().reply_markup;
  
  export const RESTART = Markup.keyboard([
    Markup.button.text('Yangi buyurtma berish')
  ]).resize().reply_markup;

//Admin keyboards

export const ADMINHOME = Markup.keyboard([
  Markup.button.text('📉 Userlar soni'),
  Markup.button.text('📥 Excel faylni yuklash')
]).resize().reply_markup;

export const EXCELLPAGE = Markup.keyboard([
  Markup.button.text('🗒 Oxirgi 7 kun'),
  Markup.button.text('🗓 Oxirgi 30 kun'),
  Markup.button.text('📅 Qo\'lda kiritish'),
  Markup.button.text('🔙 Ortga'),

]).resize().reply_markup;