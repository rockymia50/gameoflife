import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React. Component{
// arrow functions to refer to the correct 'this.'
selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col)
}
render (){
    return (
        <div 
        className= {this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
        />
    );
}
}


class Grid extends React.Component{
 render (){
const width = this.props.col * 14
var rowArr = [];

var boxClass = "";
for (var i = 0; i < this.props.row; i++){
    //nested for loop, usually done by mapping
    for (var j = 0; j < this.props.row; j++){
        let boxId = i + "" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowArr.push(
            <box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
            />
        )
    }
}

return (
    <div className= "Grid" style= {{width:width}}>
{{rowArr}}
        
    </div>
        );

    }
}

class Main extends React.Component{
constructor(){
    super();
    //Stating Variables
this.speed = 100;
this.row = 30;
this.col = 50;


//Setting the Generation State Variable
    this.state = {
        generation: 0,
        gridFull: Array(this.rows).fill().map(() => Array(this.col).fill(false))
    }
}
render(){
    return(
            <div>
                <h1> Game of Life </h1>
                    <Grid
                    //Passing in Props into the Grid Component
                    gridFull = {this.state.gridFull}
                    row = {this.state.row}
                    col = {this.state.col}
                    selectBox= {this.selectBox}
                    
                    />
                         <h2> Generations: { this.state.generation} </h2>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
