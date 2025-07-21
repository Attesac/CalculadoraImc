// o form foi utilizado para capturar a tag do HTML e coloca em uma variável 
const form = document.querySelector('#form')

// Adiciona um evento para o form, para enviar as informações do formulario 
form.addEventListener('submit', function (e) {

    // Cancela o evento sem parar a propagação do mesmo
    e.preventDefault();

    // Armazena as informações do input
    const inputPeso = e.target.querySelector('#peso')
    const inputAltura = e.target.querySelector('#altura')

    // transforma as informações do input em valores utilizaveis 
    const peso = Number(inputPeso.value)
    const altura = Number(inputAltura.value)

    //verifica se o dado informado é um numero 
    if (!peso) {
        setResultado('Peso inválido', false)
        return;
    }
    if (!altura) {
        setResultado('Altura inválida', false)
        return;
    }

    //transforma a função getImc e getNivelImc em um valor armazenado 
    const imc = getImc(peso, altura)
    const nivelImc = getNivelImc(imc)

    // Utilizamos template string para deixar a frase legível e dinâmica
    const msg = `seu IMC é ${imc} (${nivelImc})`


    setResultado(msg, true)
})

// A função getImc serve para calcular o IMC da pessoa e deixar apenas em 2 casas decimais 
function getImc(peso, altura) {
    const imc = peso / altura ** 2
    return imc.toFixed(2)
}

// A função getNivelImc ser para indicar se a pessoa está no peso ideal, abaixo do peso ou acima do peso
function getNivelImc(imc) {

    //utilizei o array para facilitar a organização de varios valores permitindo manipular diversos dados de maneira eficiente e flexível
    const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepreso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3']

    // analisa os valores e retornam o nivel que a pessoa se encontra
    if (imc >= 39.9) return nivel[5]
    if (imc >= 34.9) return nivel[4]
    if (imc >= 29.9) return nivel[3]
    if (imc >= 24.9) return nivel[2]
    if (imc >= 18.5) return nivel[1]
    if (imc < 18.5) return nivel[0]

}

// armazenamos a tag "p" para conseguirmos criar uma no futuro
function CriaP() {
    const p = document.createElement('p')
    return p
}

// criamos um p com base nos valores
function setResultado(msg, isValid) {
    
    // pegamos e armazenamos em uma const o id resultado do html
    const resultado = document.querySelector('#resultado')
    resultado.innerHTML = '';

    //utiliza a função cria P e o torna uma variavel 
    const p = CriaP()

    //verificamos e passamos se os valores digitados são válidos ou não
    if (isValid) {
        p.classList.add('paragrafo-resultado')
    } else {
        p.classList.add('bad')
    }

    //Criamos uma tag P com o parâmetro msg
    p.innerHTML = msg
    resultado.appendChild(p)
}

