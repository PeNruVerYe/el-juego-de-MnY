<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake - El Juego de MnY</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: #1a1a2e;
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
        }
        
        canvas {
            border: 2px solid #00ff88;
            background: #16213e;
        }
        
        h1 {
            color: #00ff88;
        }
        
        .score {
            font-size: 1.5rem;
            margin: 20px;
        }
        
        .volver {
            margin-top: 20px;
            padding: 10px 20px;
            background: #00ff88;
            color: black;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        
        .volver:hover {
            background: #00cc66;
        }
    </style>
</head>
<body>
    <h1>🐍 SNAKE</h1>
    <div class="score">Puntuación: <span id="puntos">0</span></div>
    <canvas id="juego" width="400" height="400"></canvas>
    <a href="../index.html" class="volver">← VOLVER AL INICIO</a>
    
    <script>
        const canvas = document.getElementById('juego');
        const ctx = canvas.getContext('2d');
        const puntosSpan = document.getElementById('puntos');
        
        let serpiente = [{x: 200, y: 200}];
        let comida = {x: 300, y: 300};
        let dx = 10;
        let dy = 0;
        let puntos = 0;
        let juegoActivo = true;
        
        function dibujarSerpiente() {
            ctx.fillStyle = '#00ff88';
            serpiente.forEach(segmento => {
                ctx.fillRect(segmento.x, segmento.y, 10, 10);
            });
        }
        
        function dibujarComida() {
            ctx.fillStyle = '#ff0066';
            ctx.fillRect(comida.x, comida.y, 10, 10);
        }
        
        function mover() {
            if (!juegoActivo) return;
            
            const cabeza = {x: serpiente[0].x + dx, y: serpiente[0].y + dy};
            serpiente.unshift(cabeza);
            
            if (cabeza.x === comida.x && cabeza.y === comida.y) {
                puntos += 10;
                puntosSpan.textContent = puntos;
                comida = {
                    x: Math.floor(Math.random() * 40) * 10,
                    y: Math.floor(Math.random() * 40) * 10
                };
            } else {
                serpiente.pop();
            }
            
            if (cabeza.x < 0 || cabeza.x >= 400 || cabeza.y < 0 || cabeza.y >= 400) {
                juegoActivo = false;
                alert('¡Game Over! Puntuación: ' + puntos);
            }
        }
        
        function dibujar() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dibujarComida();
            dibujarSerpiente();
        }
        
        function juegoLoop() {
            mover();
            dibujar();
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' && dy === 0) {
                dx = 0;
                dy = -10;
            } else if (e.key === 'ArrowDown' && dy === 0) {
                dx = 0;
                dy = 10;
            } else if (e.key === 'ArrowLeft' && dx === 0) {
                dx = -10;
                dy = 0;
            } else if (e.key === 'ArrowRight' && dx === 0) {
                dx = 10;
                dy = 0;
            }
        });
        
        setInterval(juegoLoop, 100);
    </script>
</body>
</html>
