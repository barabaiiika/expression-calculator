function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    if (expr.match(/\(/g).length !== expr.match(/\)/g).length) throw new Error("ExpressionError: Brackets must be paired");
    while (expr.match(/[\(,\))]/)) {
        const pre = expr;
        expr = expr.replace(/\(.+?\)/g, calc);
        // if (pre === expr) throw new Error("ExpressionError: Brackets must be paired");
    }
    return Number(calc(expr));
}

module.exports = {
    expressionCalculator
}

function calc(string) {
    let arr = string.match(/\d+\.?\d*|[*/+-]/g);
    let arrAfterCalc = [];
    
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const previousItem = arrAfterCalc[arrAfterCalc.length - 1];
        if (['*', '/'].includes(item)) {
            const result = (item === '*') ? (previousItem * arr[i+1]) : (previousItem / arr[i+1]);
            if (Math.abs(result) === Infinity) throw new Error("TypeError: Division by zero.");
            arrAfterCalc.pop();
            arrAfterCalc.push(result);
            i++;
            
        } else {
            arrAfterCalc.push(item);
        }
        
    }

    arr = [...arrAfterCalc];
    arrAfterCalc = [];

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        let previousItem = arrAfterCalc[arrAfterCalc.length - 1];
        if (['+', '-'].includes(item)) {
            previousItem = previousItem || '0';
            const result = (item === '+') ? (Number(previousItem) + Number(arr[i+1])) : (previousItem - arr[i+1]);
            arrAfterCalc.pop();
            arrAfterCalc.push(result);
            i++;
        } else {
            arrAfterCalc.push(item);
        }
        
    }

    return arrAfterCalc.toString();
}


expressionCalculator('((1 + 2 * 3)');