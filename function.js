function start(){
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

    // cano.classList.remove = "animation-cano"
    cano.style.left = ""
    cano.style.right = "-10%"

    mario.style.display = "block"
    mariol.style.display = "none"
    mario.style.bottom = "50px"
    

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

    var pontos = 0;
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
            podeContar = false;
            morte.play()
            
            document.querySelector("#bg1").classList.remove("bg1")
            document.querySelector("#bg2").classList.remove("bg2")
            
            cano.classList.remove("animation-cano")
            cano.style.left = canoPosition+"px"

            mario.style.display = "none"
            
            mariol.style.bottom = marioAlt+"px"
            mariol.style.display = "block"

            document.querySelector(".bg-starter").style.opacity = "0.5"
            document.querySelector("#botao").style.display = "block"
            document.querySelector("#botao").textContent = "Jogar novamente"
           

            clearInterval(loop1)
        }

    },10)


}









