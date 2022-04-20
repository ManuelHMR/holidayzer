import express, { response } from "express";
import cors from "cors";

const app = express();
app.use(cors())

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

app.get("/holidays", (request, response) => {
    response.send(holidays)
});

app.get("/is-today-holiday", (request, response) => {
    const hoje = new Date();
    holidays.map(holiday =>{
        if(checkHoliday(hoje.toLocaleDateString())){
            response.send("Sim, hoje é nome-do-feriado");
        }
        else{
            response.send(`Não, hoje não é feriado`)
        }
    })
});

app.get("/holidays/:idmes", (request, response) => {
    const mes = request.params.idmes;
    response.send(mapMonth(mes));
});

app.listen(5000)


function checkHoliday(today){
    for(let i = 0; i < holidays.length; i++){
        if(holidays[i].date === today){
            return true
        }
    }
    return false
}

function mapMonth(mes){
    let arr = [];
    holidays.map((holiday, index) => {
        let {date} = holiday;
        let str = date.split('/')
        if(mes === str[0]){
            arr.push(holidays[index])
        }
    })
    return arr
}