const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


let gameOn = true;

class Field {
    constructor(field) {
        this._field = field;
        this.x = 0;
        this.y = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        console.log(this._field)
    }

    static generateField() {
        //every tiem we run the game it will have a new field with random dimensions
        const height = Math.floor(Math.random() * (8 - 4 + 1) + 4);
        const width = Math.floor(Math.random() * (5 - 3 + 1) + 3);
        const holes = Math.floor(Math.random() * (10 - 5 + 1) + 3);
        let newField = [];
        //creating the height
        for (let i = 0; i < height; i++) {
            newField.push([]);
            //creating the width
            for (let j = 0; j < width; j++) {
                newField[i].push(fieldCharacter)
            }
        }


        //setting the position of the hat
        let hatX = Math.floor(Math.random() * width)
        let hatY = Math.floor(Math.random() * height)
        newField[hatY][hatX] = hat;

        //setting up the holes
        for (let k = holes; k > 0; k--) {
            let holeX = hatX;
            let holeY = hatY;

            //while the hole coordinates are the same as the hat coordinates, regenerate coordinates
            while (holeX === hatX && holeY === hatY) {
                holeX = Math.floor(Math.random() * width)
                holeY = Math.floor(Math.random() * height)
            }
            newField[holeY][holeX] = hole;
        }

        //setting the start point
        newField[0][0] = pathCharacter;
        return newField
    }


    ask() {
        let move = prompt('Which direction do you want to go? (u for up, d, for down, l for left, r for right)')

        switch (move.toLowerCase()) {
            case 'u':
                console.log('moving up')
                this.y -= 1
                break;
            case 'd':
                console.log('moving down')
                this.y += 1
                break;
            case 'l':
                console.log('moving left')
                this.x -= 1
                break;
            case 'r':
                console.log('moving right')
                this.x += 1
                break;
            default:
                break;
        }
    }

    checkWin() {
        switch (this._field[this.y][this.x]) {
            case hole:
                console.log('You lose - you fell in a hole')
                gameOn = false;
                break
            case undefined:
                console.log('You lose - out of boundary')
                gameOn = false;
                break
            case hat:
                console.log('******************')
                console.log('You won !!!!')
                console.log('Congrats!!!!!!!!')
                console.log('******************')
                gameOn = false;
                break
            case fieldCharacter:
                console.log('keep looking')
                this._field[this.y][this.x] = pathCharacter;
                break
            case pathCharacter:
                console.log('you are stepping on *')
                break
        }
    }

}



const camp = new Field(Field.generateField())

const game = () => {
    while(gameOn) {
        console.log(camp.field)
        camp.ask();
        camp.checkWin()
    }
    console.log('Game over')
}

game();
