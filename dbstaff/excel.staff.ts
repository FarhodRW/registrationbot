import XLSX from 'xlsx'
import { UserModel } from '../model/user.model'
import { export2excel } from './export2excel';

export async function exportExcelStaff(dto) {
    console.log('calllled');
    
    let query = { createdAt: {}}
    let dateFrom 
    let dateTo

    if(dto==7 || dto==30){
         dateTo = new Date()
         console.log(dateTo);
         
         dateFrom = dateTo.setDate(dateTo.getDate() - dto);

        query.createdAt = {
            $gte: new Date(dateFrom),
          }
        }
   
    else {
        
        dateFrom = new Date(dto[0]);
        dateTo = new Date(dto[1])

        
        query.createdAt = {
            $gte: new Date(dateFrom),
            $lte: new Date(dateTo)
        }
    }

    const data = await UserModel.aggregate([
        {$match: query},
        {"$project": {
            createdAt: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$createdAt"
              }
            },
            updatedAt: {
              $dateToString: {
                format: "%d-%m-%Y",
                date: "$updatedAt"
              }
            },
            telegramId:1,
            fullname:1,
            course:1,
            days:1,
            times:1,
            number:1,


            
          }}
    ])
    const folder = await export2excel(data)
    console.log(folder);
    return folder
    
}