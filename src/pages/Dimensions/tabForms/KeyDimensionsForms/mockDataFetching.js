import React from "react";
import {Button, Table, TableBody, TableHead} from "@mui/material";

class KeyDimensionsAPI extends React.Component{
    constructor(props) {
        super(props);
        this.handleShowmore=this.handleShowmore.bind(this)
        this.state={
            items:[],
            isDataLoaded:false
        };
    }
    handleShowmore(){
        this.setState({
            showItems:
                this.state.showItems>=this.state.items.length ?
                    this.state.showItems:this.state.showItems+1
        })
    }
    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/machine/lamination/")
            .then((res)=>res.json())
            .then((json)=>{
                this.setState({
                    items:json,
                    showItems:2,
                    isDataLoaded:true
                });
            })
    }
    render() {

        const {isDataLoaded,items}=this.state;

        if(isDataLoaded)return<div><h1>Loading....</h1></div>
        return (
            <div className="App">
                <h1 className="display-4">Key Dimensions of the Machine(Stator || Lamination)</h1>{
                items.slice(0,this.state.showItems).map((item) => (
                    <Table align="center" className="table-table-bordered row justify-content-center">
                        <ol key={item.id}><br/>
                            <TableBody>
                            <TableHead>Lamination Type:</TableHead> {item.lamination_type}
                            <TableHead>CoreLength: </TableHead>{item.coreLength}
                            <TableHead>Rotor Inner Diameter:</TableHead> {item.rotor_innerDiameter}
                            <TableHead>Rotor Outer Diamter: </TableHead>{item.rotor_outerDiameter}
                            <TableHead>Holes:</TableHead> {item.holes}
                            <TableHead>Packing Factor:</TableHead>{item.packingFactor}
                            <TableHead>Material:</TableHead> {item.material}</TableBody>
                        </ol></Table>
                ))
            }
                <Button size="small" onClick={this.handleShowmore}>Show more</Button>

            </div>

        )

    }

}
export default KeyDimensionsAPI;