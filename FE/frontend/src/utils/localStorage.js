export const getDataFormLocalStorage =(key)=>{

    try {
        const data = JSON.parse(localStorage.getItem(key));
        return data
    } catch (error) {
        return undefined
    }
}

export const setDataToLocalStorage =(key,data)=>{
    localStorage.setItem(key,JSON.stringify(data));
}

export const deleteDataFromLocalStorage =(key)=>{
    localStorage.removeItem(key);
}