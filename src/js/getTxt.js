import axios from "axios";

export function addAsync (){
    return axios.get('https://api.uixsj.cn/hitokoto/get?type=social')
}

export function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log("Time's up -- stop!");
        callback();
    }, 1000);
}

export function getStatistics (data=[]){
    return data.reduce((total, item) => {
        if (item.accomplish) {
            total++
        }
        return total
    }, 0)
}