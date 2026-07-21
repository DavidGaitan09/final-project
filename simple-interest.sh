#!/bin/bash
# Script para calcular el interés simple

echo "Ingrese el capital (Principal):"
read p
echo "Ingrese la tasa de interés anual (%):"
read r
echo "Ingrese el período de tiempo (en años):"
read t

# Cálculo del interés simple: s = (p * r * t) / 100
s=`expr $p \* $r \* $t / 100`

echo "El interés simple es: $s"
