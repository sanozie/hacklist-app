const param = (object) => {
    let parameters = [];
    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            parameters.push(encodeURI(property + '=' + object[property]));
        }
    }

    return parameters.join('&');
}

export default param