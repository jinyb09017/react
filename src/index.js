import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     constructor(props) {
//         //必须添加super.构造方法实例化需要调用父类
//         super(props)
//         // this.state = {
//         //     value : null,
//         // }
//     }
//     render() {
//         return (
//             <button className="square" onClick={this.props.onClick}>
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(row,col) {
        console.log("odinate",row,col)
        return <Square value={this.props.squares[row][col]}
            onClick={() => this.props.onClick(row,col)} />;
    }


    render() {
        const {row, col} = this.props;
        let rows = [];
        for(let i = 0; i < row; i ++) {
            let columns = [];
            //创建横向每一格
            for(let j = 0; j < col; j ++) {
                columns.push(this.renderSquare(i,j));
            }
            rows.push(<div className="board-row">{columns}</div>);
        }
        console.log(rows);
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: [Array(4).fill(null),Array(4).fill(null),Array(4).fill(null),Array(4).fill(null)],
                col:0,
                row:0,
            }],
            xIsNext: true,
            stepNumber: 0,
        };
    }

    initData(row, col) {
        //一行
        let rows = Array(row).fill(null);
        for(let i=0;i < row;i++) {
            let cols = Array(col).fill(null);
            rows.push(cols);
        }
        console.log('goodtest', rows);
        return rows;
    }

    handleClick(row,col) {
        let a=this.initData(2,4);
        //slice() 方法可提取字符串(数组)的某个部分，并以新的字符串返回被提取的部分。(创建一个副本)
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // const squares = current.squares.slice();//shadow copy
        const squares = current.squares.slice().map((row) => {return row.slice()})//deep copy
        // if (calculateWinner(squares) || squares[i]) {
        //     return;
        // }
        squares[row][col] = this.state.xIsNext ? "X" : "O";
        this.setState({
            //添加一个数组。
            history: history.concat([{
                squares: squares,
                row:row,
                col:col,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        //
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((value, index) => {
            console.log("haha",index,value);
            const desc = index ? `Go to move ${index}  and coordinate = [${value.row+1}][${value.col+1}]` : 'Go to game start';
            return (
                <li>
                    <button onClick={() => this.jumpTo(index)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winnder： ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares}
                        onClick={(i,j) => this.handleClick(i,j)} col={4} row={4}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
                <ShoppingList name="xingze" />
            </div>
        );
    }
}

class ShoppingList extends React.Component {
    render() {
        return (
            <div>
                <h1>showing list for {this.props.name}</h1>
                <ul>
                    <li>whatapp</li>
                    <li>qq</li>
                    <li>facebook</li>
                </ul>
            </div>
        );
    }
}

/**
 * 计算谁是winner
 * @param {} squares 
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    // for (let i = 0; i < lines.length; i++) {
    //     const [a, b, c] = lines[i];
    //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //         return squares[a];
    //     }
    // }
}


// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
