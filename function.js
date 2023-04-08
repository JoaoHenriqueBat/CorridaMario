var listaPontos = [];
var listaTimes = [];
var partida = 0;


function start(){
    var pontos = 0;
    partida += 1;
    const recompensa = [new Audio("recompensa.mp3"), new Audio("recompensa1.mp3"), new Audio("recompensa2.mp3"), new Audio("recompensa3.mp3")];
    const morte = new Audio('morte.mp3');
    var mario = document.querySelector(".mario")
    var mariol = document.querySelector(".mariolose")
    var cano = document.querySelector("#cano")
    document.querySelector("#bg1").classList.add("bg1")
    document.querySelector("#bg2").classList.add("bg2")
    document.querySelector("#cano").classList.add("animation-cano")
    document.querySelector(".bg-starter").style.opacity = "1"
    document.querySelector("#botao").style.display = "none"
    document.querySelector(".pontuacao").textContent = 0;
    document.querySelector(".painel").style.display = "none"
    document.querySelector(".pontuacao").style.display = "block"

    // cano.classList.remove = "animation-cano"
    cano.style.left = ""
    cano.style.right = "-10%"

    mario.style.display = "block"
    mariol.style.display = "none"
    mario.style.bottom = "50px"
    
    
    var segundo = 0;
    var minuto = 0;
    var hora = 0;
    var date;

    const cronometro = setInterval(()=>{

        segundo += 1;

        if(segundo == 60){
            segundo = 0
            minuto += 1

            if(minuto == 60){
                minuto = 0
                hora += 1;
            }
        }

        date = new Date(0,0,0,hora,minuto,segundo)
        var timer = dateHora(date)
        document.querySelector(".time-atual").textContent = "Tempo atual: "+timer

    },1000)
    

    setInterval(function(){
        function keyPressed(evt){
            evt = evt || window.event;
            var key = evt.KeyCode || evt.which;
            return String.fromCharCode(key)
        }
        
        document.onkeydown = function(evt){
            var mario = document.querySelector("#mario")
            var tecla = keyPressed(evt)
            if(tecla == " "){
                mario.classList.add("pular")
                setTimeout(function(){
                    mario.classList.remove("pular")
                    var i = Math.floor(Math.random() * recompensa.length)
                    recompensa[i].play()
                },500)
            }
        }
    }, 10)

    
    var podeContar = true;
    const loop1 = setInterval(function(){
        var mario = document.querySelector(".mario")
        var mariol = document.querySelector(".mariolose")
        var marioAlt = parseInt(window.getComputedStyle(mario).bottom);
        var cano = document.querySelector("#cano")
        var canoPosition = cano.offsetLeft;

        if(canoPosition < 0 && podeContar){
            setTimeout(() =>{
                podeContar = true;
            },500)
            pontos += 1;
            document.querySelector(".pontuacao").textContent = pontos;
            podeContar = false;
        }
        
        if(canoPosition >= 15 && canoPosition <= 128 && marioAlt <= 100){
            listaPontos.push(pontos)
            listaTimes.push(date)

            podeContar = false;
            morte.play()
            
            document.querySelector("#bg1").classList.remove("bg1")
            document.querySelector("#bg2").classList.remove("bg2")
            document.querySelector(".painel").style.display = "block"
            document.querySelector(".pontuacao-atual").textContent = "Pontuação atual: "+pontos
            document.querySelector(".pontuacao-max").textContent = "Pontuação máx: "+Math.max(...listaPontos)
            document.querySelector(".time-max").textContent = "Tempo máx: "+dateHora(new Date(Math.max.apply(null,listaTimes)));
            document.querySelector(".partidas").textContent = "Partidas jogadas: "+partida

            
            cano.classList.remove("animation-cano")
            cano.style.left = canoPosition+"px"

            mario.style.display = "none"
            document.querySelector(".pontuacao").style.display = "none"
            
            mariol.style.bottom = marioAlt+"px"
            mariol.style.display = "block"

            document.querySelector(".bg-starter").style.opacity = "0.5"
            document.querySelector("#botao").style.display = "block"
            document.querySelector("#botao").textContent = "Jogar novamente"
           

            clearInterval(loop1)
            clearInterval(cronometro)
        }

    },10)


}

function dateHora(date){
    const TextHora = date.getHours() < 10 ? "0"+date.getHours() : date.getHours()
    const TextMinuto = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()
    const TextSegundo = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()
    return timer = TextHora+":"+TextMinuto+":"+TextSegundo
}









