
export function removeFromLocalStorage(data, index){
    data.splice(index);
    console.log(data);
    return data;

}