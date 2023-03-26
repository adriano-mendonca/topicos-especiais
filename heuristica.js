const estado_inicial = [
  [4, 0, 6],
  [3, 7, 5],
  [2, 8, 1],
];

const estadofinal = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];

let estado_final = {
  estado: estadofinal,
  movimento: [],
};

let no_inicial = {
  estado: estado_inicial,
  movimento: [],
  proximidade: 0,
};

let avaliados = [];
let fronteira = [no_inicial];

function displayArray(matriz) {
  matriz.estado.forEach((linha) => {
    document.write('[ ');
    linha.forEach((num) => {
      document.write(num + ' ');
    });
    document.write(']');
    document.write('<br/>');
  });
  document.write('<hr/>');
  matriz.movimento.forEach((mov) => {
    document.write(mov + ' ');
  });
} //Exibe uma matriz

function compareArray(matriz1, matriz2) {
  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 3; coluna++) {
      if (matriz1.estado[linha][coluna] != matriz2.estado[linha][coluna]) {
        return false;
      }
    }
  }
  return true;
} // Compara 1 matriz com 1 matriz

function isInedited(matriz, listaMatriz = avaliados) {
  saida = true;
  listaMatriz.forEach((arr) => {
    if (compareArray(arr, matriz)) {
      saida = false;
    }
  });
  return saida;
} // Confere se ja não existe uma matriz em uma lista de matrizes

function generateChilds(matriz) {
  // matriz = {estado: movimento:}
  let filhos = [];
  let zeroLinha = 0;
  let zeroColuna = 0;

  matriz.estado.forEach((linha, indexLinha) => {
    linha.forEach((valor, indexValor) => {
      if (valor == 0) {
        zeroLinha = indexLinha;
        zeroColuna = indexValor;
      }
    });
  });

  if (zeroLinha > 0) {
    let filho = {
      estado: [],
      movimento: [],
    };

    matriz.movimento.forEach((mov) => {
      filho.movimento.push(mov);
    });

    for (let linha = 0; linha < 3; linha++) {
      filho.estado.push(matriz.estado[linha].slice());
    }

    filho.estado[zeroLinha][zeroColuna] =
      filho.estado[zeroLinha - 1][zeroColuna];
    filho.estado[zeroLinha - 1][zeroColuna] = 0;
    filho.movimento.push('&uarr;');
    filhos.push(filho);
  }

  if (zeroLinha < 2) {
    let filho = {
      estado: [],
      movimento: [],
    };

    matriz.movimento.forEach((mov) => {
      filho.movimento.push(mov);
    });

    for (let linha = 0; linha < 3; linha++) {
      filho.estado.push(matriz.estado[linha].slice());
    }

    filho.estado[zeroLinha][zeroColuna] =
      filho.estado[zeroLinha + 1][zeroColuna];
    filho.estado[zeroLinha + 1][zeroColuna] = 0;
    filho.movimento.push('&darr;');
    filhos.push(filho);
  }

  if (zeroColuna > 0) {
    let filho = {
      estado: [],
      movimento: [],
    };

    matriz.movimento.forEach((mov) => {
      filho.movimento.push(mov);
    });

    for (let linha = 0; linha < 3; linha++) {
      filho.estado.push(matriz.estado[linha].slice());
    }

    filho.estado[zeroLinha][zeroColuna] =
      filho.estado[zeroLinha][zeroColuna - 1];
    filho.estado[zeroLinha][zeroColuna - 1] = 0;
    filho.movimento.push('&larr;');
    filhos.push(filho);
  }

  if (zeroColuna < 2) {
    let filho = {
      estado: [],
      movimento: [],
    };

    matriz.movimento.forEach((mov) => {
      filho.movimento.push(mov);
    });

    for (let linha = 0; linha < 3; linha++) {
      filho.estado.push(matriz.estado[linha].slice());
    }

    filho.estado[zeroLinha][zeroColuna] =
      filho.estado[zeroLinha][zeroColuna + 1];
    filho.estado[zeroLinha][zeroColuna + 1] = 0;
    filho.movimento.push('&rarr;');
    filhos.push(filho);
  }

  return filhos;
} // Gera de 2 a 4 filhos de matriz

function heuristic(matriz) {
  let contador = 0;

  matriz.estado.forEach((item, indexLinha) => {
    item.forEach((value, indexColuna) => {
      if (value == 0) {
        value = 9;
      }

      let colunax = (value - 1) % 3;
      let linhax = Math.floor((value - 1) / 3);

      let linha = Math.abs(indexLinha - linhax);
      let coluna = Math.abs(colunax - indexColuna);

      contador += linha + coluna;
    });
  });

  return contador;
}

let cont = 0;
let contador = 100;

if (fronteira.length == 0) {
  document.write('<h3>Programa finalizado sem solução.</h3>');
} else {
  while (true) {
    let no_atual = fronteira[0];

    if (compareArray(no_atual, estado_final)) {
      document.write('<h3>Programa finalizado com solução.</h3>');
      document.write('<p>Estado avaliado:</p>');
      displayArray(no_inicial);
      document.write(
        '<p>Estado final encontrado com <strong>' +
          no_atual.movimento.length +
          '</strong> movimentos</p>',
      );
      document.write(
        '<p>Total de avaliados: <strong>' + avaliados.length + '</strong></p>',
      );
      displayArray(no_atual);
      break;
    } else {
      avaliados.push(no_atual);

      let childs = generateChilds(no_atual);

      fronteira.shift();

      childs.forEach((filho) => {
        if (isInedited(filho)) {
          filho.proximidade = heuristic(filho);
          fronteira.push(filho);
          fronteira.sort((a, b) => {
            if (a.proximidade > b.proximidade) {
              return 1;
            }
            if (a.proximidade < b.proximidade) {
              return -1;
            }
            return 0;
          });
        }
      });
      cont++;

      if (cont == contador) {
        console.log('Quantidade de avaliados: ' + avaliados.length);
        console.log('Quantidade na fronteira: ' + fronteira.length);
        console.log('Proximidade: ' + no_atual.proximidade);
        contador += 100;
      }
    }
  }
}
