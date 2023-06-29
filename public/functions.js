function createMines(w, h) {
	let blocks = [];
	for(let i=0; i<w; i++) {
		blocks.push([]);
		for(let j=0; j<h; j++) {
			blocks[i][j] = 0;
		}
	}
	
	let mines = Math.ceil(w*h*0.2);

	for(let i=0; i<mines; i++) {
		let x = Math.floor(Math.random()*w)
		let y = Math.floor(Math.random()*h)
		blocks[x][y] = -1;
	}

	return blocks;
}

function drawBlocks(w, h) {
	let div = document.getElementById("minas");

	for(let i=0; i<w; i++) {
		
		let divC = document.createElement("div");
		divC.classList.add("center");
		
		for(let j=0; j<h; j++) {
			let b = document.createElement("button");
			b.innerText = " ";
			b.classList.add("x"+i);
			b.onclick = apertar.bind(b, i, j);
/*
			if(check(blocks, i, j) == -1) {
				b.style.backgroundColor = 'red';
			}
*/			
			divC.appendChild(b);
		}
		div.appendChild(divC);
	}
}

function check(blocks, i, j) {
	console.log(blocks[i][j]);
	return blocks[i][j];
}

function apertar(i, j) {
	if (!this.classList.contains("apertado") && !this.classList.contains("flag")) {
	  this.classList.add("apertado");
	  if (check(blocks, i, j) == -1) {
		this.style.backgroundColor = "black";
	  } else {
		this.style.backgroundColor = "purple";
	  }
	  if (verBomba(i, j) == 0) {
		let buttons = getButtonsAround(i, j);
		aoRedor(buttons);
	  }
	  if(blocks[i][j]) {
		this.innerText = blocks[i][j];
	  }
	}
  }
  
  function verBomba(i, j) {
	let s = 0;
	for (let x = -1; x <= 1; x++) {
	  for (let y = -1; y <= 1; y++) {
		try {
		  if (check(blocks, i + x, j + y) == -1) {
			s++;
		  }
		} catch (error) {
		  // Tratamento de erro
		}
	  }
	}
	blocks[i][j] = s;
	return s;
  }
  
  function getButtonsAround(i, j) {
	let buttons = [];
	for (let x = -1; x <= 1; x++) {
	  let b = document.getElementsByClassName("x" + (i + x));
	  for (let y = -1; y <= 1; y++) {
		try {
		  if (
			!b[j + y].classList.contains("apertado") &&
			check(blocks, i + x, j + y) != -1
		  ) {
			buttons.push(b[j + y]);
		  }
		} catch (error) {
		  continue;
		}
	  }
	}
	return buttons;
  }
  
  function aoRedor(buttons) {
	for (let i = 0; i < buttons.length; i++) {
	  buttons[i].click();
	}
  }
  