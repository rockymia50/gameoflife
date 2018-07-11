import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';



class Box extends React.Component {
	selectBox = () => {
		this.props.selectBox(this.props.row, this.props.col);
	}

	render() {
		return (
			<div
				className={this.props.boxClass}
				id={this.props.id}
				onClick={this.selectBox}
			/>
		);
	}
}

class Grid extends React.Component{
    render (){
        const width = this.props.col * 16 
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
        );
    }
}

return (
    <div className= "Grid" style= {{width:width}}>
        {rowArr}
        
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

selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridfull);
    gridCopy[row][col]= !gridCopy[row][col];
    this.setState({
        gridFull: gridCopy
    })
}

seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.row; i++){
        for (let j = 0; i < this.col; i++){
            if (Math.floor(Math.random() * 4 === 1)) {
                gridCopy[i][j] = true;
            }
        }
    }

    this.setState({
        gridFull: gridCopy
    });
}

componentDidMount () {
    this.seed();
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

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));
