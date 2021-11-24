import { isEqual } from './arrayFuncs';
import geralTexts from '../Utils/textos.json';

export function ReturnCommitDate(data){

    var array = [{date:'', count:0}];

    data.map(e => {
        var item = array.find((f) => isEqual(e.cardDate, f.date));
        if(item)
        {
            item.count += 1;
        }else{
            array.push({date:e.cardDate, count:1})
        }
        
    })
    return array;
}


export function ReturnLineDate(data) {

    var lineDataObject = {
        labels: [],
        datasets: [
            {
                data: [],
                color: (opacity = 1) => `rgba(254, 30, 30, ${opacity})`,
                strokeWidth: 4
            }
        ],
        legend: ["Litros por Semana"]
    }

    var array = [];

    data.map(e => {
        var date = new Date(e.cardDate);
        var mes = geralTexts.meses[date.getMonth()];

        var item = array.find((f) => isEqual(date.getDate()+" de "+geralTexts.meses[date.getMonth()],  f.month));
        if (item) {
            item.count += e.ml/1000;
        } else {
            array.push({ month: date.getDate()+" de "+mes, count: e.ml/1000 })
        }
    })

    array.map((e,index) => {
        if(index <= 6){
        lineDataObject.labels.unshift(e.month)
        lineDataObject.datasets[0].data.unshift(e.count)
        }
    })

    if(array.length > 5){
        array.slice(Math.max(array.length - 5, 1))
    }

    if(lineDataObject.labels.length < 2){
        lineDataObject.labels.push("Aguardando Bebedeira")
        lineDataObject.datasets[0].data.push(0)
    }

    return lineDataObject;
}
