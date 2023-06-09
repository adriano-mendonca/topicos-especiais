const estado_inicial = [
  [1, 5, 2],
  [4, 8, 3],
  [0, 7, 6],
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
};

let avaliados = [];
let fronteira = [no_inicial];

function displayArray(matriz) {
  matriz.forEach((linha) => {
    document.write('[ ');
    linha.forEach((num) => {
      document.write(num + ' ');
    });
    document.write(']');
    document.write('<br/>');
  });
  document.write('<hr/>');
} //Exibe uma matriz

function displayMov(array) {
  array.forEach((mov) => {
    document.write(mov + ' ');
  });
} // Exibe os movimentos

function displayListArray(matriz) {
  matriz.forEach((arr) => {
    displayArray(arr.estado);
  });
} // Exibe uma lista de matrizes

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
    filho.movimento.push('^');
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
    filho.movimento.push('v');
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
    filho.movimento.push('<');
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
    filho.movimento.push('>');
    filhos.push(filho);
  }

  return filhos;
} // Gera de 2 a 4 filhos de matriz

function isInedited(matriz, listaMatriz) {
  saida = true;
  listaMatriz.forEach((arr) => {
    if (compareArray(arr, matriz)) {
      saida = false;
    }
  });
  return saida;
} // Confere se ja não existe uma matriz em uma lista de matrizes

//3.265.920 combinações possíveis

if (fronteira.length == 0) {
  document.write('<h3>Programa finalizado sem solução.</h3>');
} else {
  while (true) {
    let no_atual = fronteira[0];

    if (compareArray(no_atual, estado_final)) {
      document.write('<h3>Programa finalizado com solução.</h3>');
      displayArray(no_atual.estado);
      displayMov(no_atual.movimento);
      break;
    } else {
      avaliados.push(no_atual);
      let childs = generateChilds(no_atual);

      fronteira.shift();

      childs.forEach((filho) => {
        if (isInedited(filho, avaliados)) {
          fronteira.push(filho);
        }
      });
    }
  }
}
