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
const ulDescription = document.getElementById('ul-description')
const divAlt = document.getElementById('div-alt')
const selAtt1 = document.getElementById('sel-att-1')
const selAtt2 = document.getElementById('sel-att-2')
const inpAttributes = [
    document.getElementById('inp-str'),
    document.getElementById('inp-dex'),
    document.getElementById('inp-con'),
    document.getElementById('inp-int'),
    document.getElementById('inp-wis'),
    document.getElementById('inp-car')
]

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
let pointCosts = [0,1,2,3,4,5,7,9]
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
const description = [
    ['O anão da colina recebe +2 de Constituição e +1 de Sabedoria',
    'O anão da montanha recebe +2 de Constituição e +2 de Força'],
    ['O alto elfo recebe +2 de Destreza e +1 de Inteligência',
    'O elfo silvestre recebe +2 de Destreza e +1 de Sabedoria',
    'O elfo obscuro (drow) recebe +2 de Destreza e +1 de Carisma'],
    ['O humano padrão recebe +1 em todos os atributos',
    'O humano alternativo recebe +1 em dois atributos à sua escolha'],
    ['O pequenino pés-ligeiros recebe +2 de Destreza e +1 de Carisma',
    'O pequenino robusto recebe +2 de Destreza e +1 de Constituição'],
    ['O draconato recebe +2 de Força e +1 de Carisma'],
    ['O gnomo dos bosques recebe +2 de Inteligência e +1 de Destreza',
    'O gnomo das rochas recebe +2 de Inteligência e +1 de Constituição'],
    ['O meio-elfo recebe +2 de Carisma e +1 em dois atributos à sua escolha'],
    ['O meio-orc recebe +2 de Força e +1 de Constituição'],
    ['O tiferino recebe +1 de Inteligência e +2 de Carisma'],
]
const classHint = [
    'Pegue seus dois valores de atributo mais altos e coloque o maior em Força e o outro em Constituição.',
    'Seu carisma deve ter o maior valor possível, seguido de Destreza.',
    'Carisma deve ser seu atributo de maior valor, seguido de Constituição.',
    'Sabedoria deve receber o seu maior valor de atributo, seguida de Força ou Constituição.',
    'Sabedoria deve receber o seu maior valor de atributo, seguido por Constituição.',
    'Carisma deve ser seu atributo de maior valor, seguido por Constituição.',
    'Torne seu maior valor de atributo a Destreza, depois a Sabedoria. Alguns guardiões focados em combate com duas armas preferem que Força seja maior que Destreza.',
    'Se quiser se especializar em armas de combate corpo a corpo, coloque seu valor de atributo mais alto em Força, ou, se preferir ser um arqueiro (ou lutar com armas de acuidade), em Destreza. Seu segundo valor mais alto deve ser atribuiído a Constituição ou Inteligência, caso pretenda adotar o arquétipo marcial do Cavaleiro Místico.',
    'Destreza deve receber o seu maior valor de atributo. Faça da Inteligência o seu próximo atributo mais alto, se quiser se destacar na Investigação, ou se planeja assumir o arquétipo Trapaceiro Arcano. Escolha Carisma, se planeja enfatizar o logro e a interação social.',
    'Inteligência deve ser seu atributo de maior valor, seguido por Constituição ou Destreza. Se você planeja se juntar à Escola do Encantamento, faça com que Carisma seja seu próximo atributo de maior valor.',
    'Destreza deve receber o seu maior valor de atributo, seguida por Sabedoria.',
    'Força deve ser seu atributo principal, seguido por Carisma.'
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

    //Atualiza a descrição
    ulDescription.innerHTML = ''
    const subracesLength = subraces[selRace.value].length === 0 ? 1 : subraces[selRace.value].length
    for(let i = 0; i < subracesLength; i++){
        const li = document.createElement('li')
        li.innerHTML = description[selRace.value][i]
        ulDescription.appendChild(li)
    }

    //Restaura os atributos alternativos
    altRacialBonus = [0,0,0,0,0,0]

    updateSubraces(sumLength) //atualiza a lista de sub-raças
    updateRacialBonus() //atualiza o bônus racial
    resetTotal()
    // updateTotal() //atualiza o total
}

function updateSubraces(sumLength){
    //Torna a seleção de sub-raça visível/invisível dependendo da raça selecionada
    if(subraces[selRace.value].length > 0 && selRace.value != -1) 
        divSubrace.classList.remove('disabled')
    else divSubrace.classList.add('disabled')
    
    //Atualiza as opções das sub-raças
    selSubrace.innerHTML = '<option class="w3-light-grey" value="-1" disabled selected>Selecione</option>'
    for(let i = 0; i < subraces[selRace.value].length; i++){
        const opt = document.createElement('option')
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

function updateAttribute(event){
    //Recebe os valores dos inputs
    let input = event.target
    let index = 0

    //Valida a entrada
    if(parseInt(input.value) > 15) input.value = 15
    if(parseInt(input.value) < 8) input.value = 8
    
    //Inicializa a compra de pontos
    pointsLeft = 27
    let pointCost = pointCosts[input.value - 8]
    
    //Verifica todos os atributos e calcula os pontos restantes
    for(let i = 0; i < 6; i++){
        //Identifica o atributo que foi alterado
        if(attributes[i] != Number(inpAttributes[i].value)) index = i

        //Atualiza os atributos
        attributes[i] = Number(inpAttributes[i].value)

        //Calcula os pontos restantes
        pointsLeft -= pointCosts[attributes[i] - 8] || 0
    }

    //Atualiza o valor do atributo comprado, caso seu custo seja superior aos pontos disponíveis
    if(pointCost > pointsLeft + pointCost) {
        //Obtém o maior valor comprável
        let buyable = 0
        pointCosts.forEach(cost =>{
            if(cost <= pointsLeft + pointCost) buyable = cost
        })

        //Atribui o maior valor comprável ao atributo
        attributes[index] = Number(pointCosts.indexOf(buyable) + 8)
        input.value = attributes[index]

        //atualiza os pontos restantes
        pointsLeft = pointsLeft + pointCost - buyable
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
    for(let i = 1; i < selAtt[opt].options.length; i++){
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

function selectClass(){
    const selClass = document.getElementById('sel-class')
    const liClassHint = document.getElementById('li-class-hint')
    const divClassHint = document.getElementById('div-class-hint')
    liClassHint.innerHTML = classHint[selClass.value]
    divClassHint.classList.remove('disabled')
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

    updateCost() //atualiza o custo dos pontos
}

function updateCost(){
    for(let i = 0; i < 6; i++){
        document.getElementsByName('td-cost')[i].innerHTML = pointCosts[attributes[i] - 8]
    }
}

function reset(){
    //Reseta os valores
    inpAttributes.forEach((att,i) =>{
        att.value = 8
        attributes[i] = 8
    })
    pointsLeft = 27
    spnPointsLeft.innerHTML = pointsLeft
    updateTotal()
}

function resetTotal(){
    for(let i = 0; i < 6; i++){
        document.getElementsByName('td-total')[i].innerHTML = 8
    }
}