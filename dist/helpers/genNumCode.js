const genNumCode = (lenght) => {
    let randomCode = "";
    for (let index = 0; index <= lenght - 1; index++) {
        const number = Math.floor(Math.random() * 10);
        randomCode += number;
    }
    return randomCode;
};
export default genNumCode;
