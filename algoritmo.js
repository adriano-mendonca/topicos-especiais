const estadoInicial = [
  [5, 1, 2],
  [4, 8, 3],
  [0, 7, 6],
];
const estadoFinal = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];

let avaliados = [];
let fronteira = [estadoInicial];

function displayListArray(matriz) {
  matriz.forEach((table) => {
    table.forEach((linha) => {
      document.write('[ ');
      linha.forEach((valor) => {
        document.write(valor + ' ');
      });
      document.write(']');
      document.write('<br/>');
    });
    document.write('<hr/>');
  });
} // Exibe uma lista de matrizes

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

function compareArray(matriz1, matriz2) {
  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 3; coluna++) {
      if (matriz1[linha][coluna] != matriz2[linha][coluna]) {
        return false;
      }
    }
  }
  return true;
} // Compara 1 matriz com 1 matriz

function generateChilds(matriz) {
  avaliados.push(matriz);
  let zeroLinha = 0;
  let zeroColuna = 0;
  matriz.forEach((linha, indexLinha) => {
    linha.forEach((valor, indexValor) => {
      if (valor == 0) {
        zeroLinha = indexLinha;
        zeroColuna = indexValor;
      }
    });
  });

  let filhos = [];

  if (zeroLinha > 0) {
    let filho = [];
    for (let linha = 0; linha < 3; linha++) {
      filho.push(matriz[linha].slice());
    }

    filho[zeroLinha][zeroColuna] = filho[zeroLinha - 1][zeroColuna];
    filho[zeroLinha - 1][zeroColuna] = 0;
    filhos.push(filho);
  }

  if (zeroLinha < 2) {
    let filho = [];
    for (let linha = 0; linha < 3; linha++) {
      filho.push(matriz[linha].slice());
    }

    filho[zeroLinha][zeroColuna] = filho[zeroLinha + 1][zeroColuna];
    filho[zeroLinha + 1][zeroColuna] = 0;
    filhos.push(filho);
  }
  if (zeroColuna > 0) {
    let filho = [];
    for (let linha = 0; linha < 3; linha++) {
      filho.push(matriz[linha].slice());
    }

    filho[zeroLinha][zeroColuna] = filho[zeroLinha][zeroColuna - 1];
    filho[zeroLinha][zeroColuna - 1] = 0;
    filhos.push(filho);
  }
  if (zeroColuna < 2) {
    let filho = [];
    for (let linha = 0; linha < 3; linha++) {
      filho.push(matriz[linha].slice());
    }

    filho[zeroLinha][zeroColuna] = filho[zeroLinha][zeroColuna + 1];
    filho[zeroLinha][zeroColuna + 1] = 0;
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

let contador = 1;

while (true) {
  if (fronteira.length == 0) {
    document.write('<h4>Programa finalizado SEM SOLUÇÃO!</h4>');
    break;
  } else {
    if (compareArray(fronteira[0], estadoFinal)) {
      document.write(
        `<h4>Programa finalizado com ${contador} TENTATIVAS!</h4>`,
      );
      displayArray(fronteira[0]);
      break;
    } else {
      avaliados.push(fronteira[0]);
      let childs = generateChilds(fronteira[0]);
      for (cont = 0; cont < childs.length; cont++) {
        if (isInedited(childs[cont], avaliados)) {
          fronteira.push(childs[cont]);
        }
      }
      contador++;
      console.log(contador);
      childs.length = 0;
      fronteira.shift();
    }
  }
}
//3.265.920 combinações possíveis
