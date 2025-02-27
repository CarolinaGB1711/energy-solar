function calcularCeldasSolares() {
    var consumoMes1 = parseFloat(document.getElementById("mes1").value);
    var consumoMes2 = parseFloat(document.getElementById("mes2").value);
    var consumoMes3 = parseFloat(document.getElementById("mes3").value);
    var consumoMes4 = parseFloat(document.getElementById("mes4").value);
    var consumoMes5 = parseFloat(document.getElementById("mes5").value);
    var tipoCelda = document.getElementById("tipoCelda").value;

    // Calcular consumo promedio mensual y diario
    var consumoPromedioMensual = (consumoMes1 + consumoMes2 + consumoMes3 + consumoMes4 + consumoMes5) / 5;
    var consumoDiario = consumoPromedioMensual / 30;
    var horasSolPico = 6; // Promedio de horas de sol pico al día
    var eficienciaPanel;

    // Definir eficiencia según el tipo de celda
    if (tipoCelda === "Monocristalina - 20%") {
        eficienciaPanel = 0.20; // 20% de eficiencia
    } else if (tipoCelda === "Policristalina - 15%") {
        eficienciaPanel = 0.15; // 15% de eficiencia
    } else if (tipoCelda === "Arseniuro de  Galio - 30%") {
        eficienciaPanel = 0.30; // 30% de eficiencia
    } else if (tipoCelda === "De película delgada - 10%") {
        eficienciaPanel = 0.10; // 10% de eficiencia
    } else {
        eficienciaPanel = 0.15; // Valor por defecto
    }

    // Calcular la cantidad de celdas solares necesarias
    var energiaPorDia = consumoDiario / (horasSolPico * eficienciaPanel);
    var consumomensualSolar = energiaPorDia * 30 ;
    var celdasNecesarias = Math.ceil(energiaPorDia); // Redondeamos hacia arriba

    // Mostrar los resultados
    document.getElementById("resultado1").innerHTML = "El número de Celdas solares necesarias: " + celdasNecesarias;
    document.getElementById("resultado2").innerHTML = "El consumo promedio mensual de energía sin Celdas solares: " + consumoPromedioMensual.toFixed(2) + " kWh";
    document.getElementById("resultado3").innerHTML = "El consumo promedio mensual de energía con Celdas solares: " + consumomensualSolar.toFixed(2) + " kWh";
    document.getElementById("resultado4").innerHTML = "El consumo de energía por día sin Celda Solar es: " + consumoDiario.toFixed(2) + " kWh";
    document.getElementById("resultado5").innerHTML = "El consumo de energía por día con Celda Solar es: " + energiaPorDia.toFixed(2) + " kWh";

    // Datos para el gráfico de comparación Mensual
    const data = {
        labels: ['Consumo sin Energía Solar','Consumo con Energía Solar'],
        datasets: [{
            label: 'Consumo de Energía (kWh)',
            data: [consumoPromedioMensual, consumomensualSolar],
            backgroundColor: ['red','#007bff'] // red para promedio con solar, azul promedio gasto mensual
        }]
    };

    // Configuración del gráfico
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Comparación de Consumo de Energía Mensual'
                }
            }
        },
    };

    // Renderizar el gráfico
    const ctx = document.getElementById('energyChart').getContext('2d');
    new Chart(ctx, config);

        // Datos para el gráfico de comparación
        const data1 = {
            labels: ['Consumo sin Energía Solar', 'Consumo con Energía Solar'],
            datasets: [{
                label: 'Consumo de Energía (kWh)',
                data: [consumoDiario, energiaPorDia],
                backgroundColor: ['#28a745', 'yellow'] // red para promedio con solar, azul promedio gasto mensual, verde sin solar, amarillo con solar
            }]
        };
    
        // Configuración del gráfico
        const config1 = {
            type: 'bar',
            data: data1,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Comparación de Consumo de Energía por día'
                    }
                }
            },
        };
    
        // Renderizar el gráfico
        const ctx1 = document.getElementById('energyChart1').getContext('2d');
        new Chart(ctx1, config1);
}


    document.getElementById("miFormulario").addEventListener("submit", function(event) {
        let input = document.getElementById("numero").value;
        
        if (!/^\d+$/.test(input)) { // Solo permite números enteros positivos
            alert("Por favor, ingrese un número válido.");
            event.preventDefault(); // Evita que se envíe el formulario
        }
    });
