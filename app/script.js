//DOM
const inpStr = document.getElementById('inp-str')
const inpDex = document.getElementById('inp-dex')
const inpCon = document.getElementById('inp-con')
const inpInt = document.getElementById('inp-int')
const inpWis = document.getElementById('inp-wis')
const inpCar = document.getElementById('inp-car')
const spnPointsLeft = document.getElementById('spn-points-left')
const selRace = document.getElementById('sel-race')
const selSubrace = document.getElementById('sel-subrace')
const divSubrace = document.getElementById('div-subrace')
const divAlt = document.getElementById('div-alt')
const selAtt1 = document.getElementById('sel-att-1')
const selAtt2 = document.getElementById('sel-att-2')

//VAR
const pointsTotal = 27
let pointsLeft = 27
let attributes = [
    inpStr.value,
    inpDex.value,
    inpCon.value,
    inpInt.value,
    inpWis.value,
    inpCar.value
]
let pointCost = [0,1,2,3,4,5,7,9]
const races = [
    'Anão',
    'Elfo',
    'Humano',
    'Pequenino',
    'Draconato',
    'Gnomo',
    'Meio-Elfo',
    'Meio-Orc',
    'Tiferino'
]
const subraces = [
    ['Anão da Colina','Anão da Montanha'],
    ['Alto Elfo','Elfo Silvestre','Elfo Obscuro (Drow)'],
    ['Padrão','Alternativo'],
    ['Pés-Ligeiros','Robustos'],
    [],
    ['Gnomo dos Bosques','Gnomo das Rochas'],
    [],
    [],
    [],
]
const racialBonus = [
    [0,0,2,0,1,0], //Anão da Colina
    [2,0,2,0,0,0], //Anão da Montanha
    [0,2,0,1,0,0], //Alto Elfo
    [0,2,0,0,1,0], //Elfo Silvestre
    [0,2,0,0,0,1], //Elfo Obscuro (Drow)
    [1,1,1,1,1,1], //Padrão
    [0,0,0,0,0,0], //Alternativo
    [0,2,0,0,0,1], //Pés-Ligeiros
    [0,2,1,0,0,0], //Robustos
    [1,0,0,0,0,1], //Draconato
    [0,1,0,2,0,0], //Gnomo dos Bosques
    [0,0,1,2,0,0], //Gnomo das Rochas
    [0,0,0,0,0,2], //Meio-Elfo
    [2,0,1,0,0,0], //Meio-Orc
    [0,0,0,1,0,2], //Tiferino
]
let altRacialBonus = [0,0,0,0,0,0]
let attributeTotal = [8,8,8,8,8,8]
let characterRace = 6 //Alternativo zerado = 6
let halfelf = false

for(let i = 0;i < races.length; i++){
    let opt = document.createElement('option')
    opt.innerHTML = races[i]
    opt.value = i
    selRace.appendChild(opt)
}

function selectRace(){
    //Calcula o valor
    let sumLength = 0
    for(let i = 0; i < Number(selRace.value) + 1; i++){
        sumLength += subraces[i].length
        if(subraces[i].length == 0) sumLength++
    }
    characterRace = sumLength - 1

    //Oculta a div de atributos alternativos
    divAlt.classList.add('disabled')

    //Reseta a seleção de atributos
    selAtt1.value = -1
    selAtt2.value = -1
    for(let i = 1; i < 7; i++){
        selAtt1.options[i].disabled = false
        selAtt2.options[i].disabled = false
    }

    updateSubraces(sumLength) //atualiza a lista de sub-raças
    updateRacialBonus() //atualiza o bônus racial
}

function updateSubraces(sumLength){
    //Torna a seleção de sub-raça visível/invisível dependendo da raça selecionada
    if(subraces[selRace.value].length > 0 && selRace.value != -1) 
        divSubrace.classList.remove('disabled')
    else divSubrace.classList.add('disabled')
    
    //Atualiza as opções das sub-raças
    selSubrace.innerHTML = '<option value="-1">Selecione</option>'
    for(let i = 0; i < subraces[selRace.value].length; i++){
        let opt = document.createElement('option')
        opt.innerHTML = subraces[selRace.value][i]
        opt.value = sumLength + (i - subraces[selRace.value].length)
        selSubrace.appendChild(opt)
    }
}

//Atualiza o bônus racial de acordo com a sub-raça selecionada
function selectSubrace(){
    characterRace = Number(selSubrace.value)
    updateRacialBonus()
}

function updateAttribute(){
    //Recebe os valores dos inputs
    attributes = [
        inpStr.value,
        inpDex.value,
        inpCon.value,
        inpInt.value,
        inpWis.value,
        inpCar.value
    ]
    
    //Calcula os pontos restantes
    pointsLeft = 27
    for(let i = 0; i < 6; i++){
        pointsLeft = pointsLeft - pointCost[attributes[i] - 8]
    }

    //Atualiza o HTML com os pontos restantes
    spnPointsLeft.innerHTML = pointsLeft

    //Se não houver mais pontos sobrando, limita o valor máximo dos inputs para os atuais
    if(pointsLeft == 0){
        inpStr.max = inpStr.value
        inpDex.max = inpDex.value
        inpCon.max = inpCon.value
        inpInt.max = inpInt.value
        inpWis.max = inpWis.value
        inpCar.max = inpCar.value
    } else {
        inpStr.max = 15
        inpDex.max = 15
        inpCon.max = 15
        inpInt.max = 15
        inpWis.max = 15
        inpCar.max = 15
    }
    
    updateTotal() //atualiza o total
}

function updateRacialBonus(){
    //Se houver sub-raça e ela não for selecionada
    if(selSubrace.value == -1 && subraces[selRace.value].length > 0 || selRace.value == -1) {
        for(let i = 0; i < 6; i++){
            document.getElementsByName('td-racial')[i].innerHTML = 0
        }
        console.log('parou')
        return
    } 
    
    //Mostra o bônus racial na tela
    for(let i = 0; i < 6; i++){
        document.getElementsByName('td-racial')[i].innerHTML = racialBonus[characterRace][i]
    }
    
    //Se for um meio-elfo ou humano alternativo
    if(characterRace == 6 || characterRace == 12){
        //Mostra as seleções de atributos
        divAlt.classList.remove('disabled')
        
        //Mostra o bônus racial alternativo na tela
        for(let i = 0; i < 6; i++){
            document.getElementsByName('td-racial')[i].innerHTML = altRacialBonus[i]
        }

        //Se for um meio-elfo
        if(characterRace == 12) { 
            //Desabilita a escolha de Carisma, pois já recebe da raça
            selAtt1.childNodes[13].disabled = true
            selAtt2.childNodes[13].disabled = true
            document.getElementsByName('td-racial')[5].innerHTML = 2
            halfelf = true
        } else {
            if(halfelf){
                //Se um meio-elfo havia sido escolhido anteriormente, habilita a escolha de Carisma, pois estava desabilitada
                selAtt1.childNodes[13].disabled = false
                selAtt2.childNodes[13].disabled = false
                halfelf = false
            }
        }
    } else {
        divAlt.classList.add('disabled') //Esconde a seleção de atributos
    }
    updateTotal() //atualiza o total
}

function selectAttributeBonus(opt,value){
    const selAtt = [
        document.getElementById('sel-att-1'),
        document.getElementById('sel-att-2')
    ]

    //Habilita a seleção de todos os atributos
    for(let i = 0; i < selAtt[opt].options.length; i++){
        selAtt[opt].options[i].disabled = false
    }

    //Desabilita a seleção do atributo selecionado na outra caixa de seleção
    selAtt[opt].options[Number(value) + 1].disabled = true
    
    //Insere o bônus racial alternativo
    altRacialBonus = [0,0,0,0,0,0]
    for(let i = 0; i < 2; i++){
        altRacialBonus[selAtt[i].value] = 1
    }
    updateRacialBonus() //atualiza o bônus racial
}

function updateTotal(){
    //Calcula o total e atualiza a tela
    for(let i = 0; i < 6; i++){
        attributeTotal[i] = Number(attributes[i]) + racialBonus[characterRace][i] + altRacialBonus[i]
        document.getElementsByName('td-total')[i].innerHTML = attributeTotal[i]
    }

    //Calcula o modificador
    let modifiers = []
    for(let i = 0; i < 6; i++){
        modifiers[i] = Math.floor(attributeTotal[i]/2 - 5)
    }
    for(let i = 0; i < 6; i++){
        document.getElementsByName('td-mod')[i].innerHTML = modifiers[i]
    }
}

function reset(){
    inpStr.value = 8
    inpDex.value = 8
    inpCon.value = 8
    inpInt.value = 8
    inpWis.value = 8
    inpCar.value = 8
    updateAttribute()
}