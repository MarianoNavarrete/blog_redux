//multiplicar sin tener el simbolod e multiplicacion
const multiply = (a,b) => {
    let result = 0
    for(let i = 0; i < b; i++){
        result = result + a;
    }
    return result;
}

console.log(multiply(9,9));

//obetener el mayor de un arreglo pero solo recorrerlouna vez

const biggest = (arr) => {
    let mayor = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > mayor){
            mayor = arr[i];
        }
    }
    return mayor;
}

console.log(biggest([1,20,3,10]));

//eliminar el 0, null y undefined

const clean = (arr) => {
    let arrCleaned = [];
    for(let i= 0 ; i<arr.length; i++){
        if(arr[i]){
            arrCleaned.push(arr[i])
        }
    }
    return(arrCleaned);
}

console.log(clean([0, null, 'hola', undefined,1232]));

//aplanar un arreglo
const plainArr = (arr) => (
    arr.reduce((accumulador, elemento) => accumulador.concat(elemento),[])
)

console.log(plainArr([[1,2],[[2,3]],[5,1]]));

//ver cuantas veces se repite una palabra

const repeated = (str) => {
    let dic = [];
    let separate = str.split(' ');
    let contains = false;
    console.log(separate);
    for (let i = 0 ; i < separate.length; i++){
        let repeat = 0
        for (let j = i; j < separate.length; j++){
            if(separate[i] === separate[j]){
                repeat = repeat + 1;
            }
        }
        for (let j = 0; j < dic.length; j++){
            if(dic[j].key === separate[i]){
                contains = true;
                break;
            }
        }
        if(!contains){
            dic.push({
                key: separate[i],
                value: repeat
            });
        }
        contains = false;
    }
    return dic;
}

console.log(repeated('hola como estas es de prueba prueba estas como estas hola hola'));

//otra solucion

const repeatedOptimized = (str) => {
    let dic = [];
    let separate = str.split(' ');
    console.log(separate);
    for (let i = 0 ; i < separate.length; i++){
        if(dic[separate[i]]){
            dic[separate[i]] += 1;
        }else{
            dic[separate[i]] = 1
        }
    }
    return dic;
}

console.log(repeatedOptimized('hola como estas es de prueba prueba estas como estas hola hola'));

//palindromo

const palindromo = (str) => {
    let isTrue = false;
    let j = str.length-1;
    for(let i = 0; i < str.length; i++){
        if(i === j){
            break;
        }
        if(str[i] === str[j]){
            isTrue = true;
            
        } else {
            isTrue = false;
            break;
        }
        j--;
    }
    if(isTrue){
        return 'es palindromo';
    } else {
        return 'no es palindromo'
    }
}

console.log(palindromo('aertrea'));

