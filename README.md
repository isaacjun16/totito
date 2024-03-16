# TotitoUmg

sitio de prueba [aqui](http://totitoumg.s3-website-us-east-1.amazonaws.com/#/main)

# Ecuación Bellman

```
Q(s, a) = Q(s, a) + α * [R + γ * max(Q(s', a')) - Q(s, a)]
```

Donde:

* Q(s, a) es el valor de la acción a en el estado s.
* α es la tasa de aprendizaje (en este caso learningRate).
* R es la recompensa obtenida por la acción.
* γ es el factor de descuento (en este caso discountFactor).
* max(Q(s', a')) es el valor máximo de las acciones en el próximo estado s'.

En el código, se ajusta el valor de Q(prevState) usando esta ecuación basada en la recompensa obtenida en el estado actual (newState) y el valor máximo de las acciones en el próximo estado. Esto permite que la computadora aprenda y ajuste sus decisiones en función de las recompensas recibidas durante el juego.

# Otras configuraciones

En cada turno de la computadora, se calcula el mejor movimiento disponible. Sin embargo, para fomentar la exploración, hay una pequeña probabilidad (20%) de que la computadora elija un movimiento aleatorio en lugar del mejor movimiento. Después de cada juego, la tabla Q se actualiza utilizando la ecuación de Bellman, teniendo en cuenta la recompensa obtenida y los valores de la tabla Q para los estados siguientes.