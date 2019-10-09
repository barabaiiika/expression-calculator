function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    while (expr.match(/[\(,\))]/)) {
        const pre = expr;
        expr.replace(/\(.+?\)/g, calc(match));
        if (pre === expr) throw new Error("ExpressionError: Brackets must be paired");
    }
    return calc(expr)
}

module.exports = {
    expressionCalculator
}

function calc(string) {
    let arr = string.replace(/[\(,\))]/g, '').split(' ').filter(item => item);

    let multipleIndex;
    let divisionIndex;
    let plusIndex;
    let minusIndex;

    do {
        multipleIndex = arr.indexOf('*');
        divisionIndex = arr.indexOf('/');
        if (multipleIndex < divisionIndex) {
            const index = multipleIndex;
            arr.splice(index - 1, 3, arr[index-1] * arr[index+1]);
        } else if (multipleIndex > divisionIndex) {
            const index = divisionIndex;
            if (Number(arr[index+1]) === 0) throw new Error("TypeError: Division by zero.");
            arr.splice(index - 1, 3, arr[index-1] / arr[index+1]);
        }

    } while (multipleIndex + divisionIndex > -2);

    do {
        plusIndex = arr.indexOf('+');
        minusIndex = arr.indexOf('-');
        if (plusIndex < minusIndex) {
            const index = plusIndex;
            arr.splice(index - 1, 3, Number(arr[index-1]) + Number(arr[index+1]));
        } else if (plusIndex > minusIndex) {
            const index = minusIndex;
            arr.splice(index - 1, 3, arr[index-1] - arr[index+1])
        }

    } while (plusIndex + minusIndex > -2);






    // while (arr.includes('*') || arr.includes('/')) {
    //     arr = arr.map((item, index, arr) => {
    //         switch (item) {
    //             case '*':
    //                 return arr[index-1] * arr[index+1];
    //             case '/':
    //                 if (Number(arr[index+1]) === 0) throw new Error("TypeError: Division by zero.");
    //                 return arr[index-1] / arr[index+1];
    //             default:
    //                 break;
    //         }
    //         return item;
    //     });
    // }

    // while (arr.includes('+') || arr.includes('-')) {
    //     arr = arr.map((item, index, arr) => {
    //         switch (item) {
    //             case '+':
    //                 return Number(arr[index-1]) + Number(arr[index+1]);
    //             case '-':
    //                 return arr[index-1] - arr[index+1];
    //             default:
    //                 break;
    //         }
    //         return item;
    //     });
    // }

    return arr.toString();
}