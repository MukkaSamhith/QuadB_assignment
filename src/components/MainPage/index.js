// import {Component} from 'react'
// import './index.css'

// class MainPage extends Component{

//     state = {top_10_list:[]}


//     componentDidMount(){
//         this.getData()
//     }

//     getData=async()=>{
//         const response = await fetch('http://localhost:3005/api/tickers')
//         const data = await response.json()
//         const updatedData = data.map((each)=>({
//             name:each.name,
//             last:each.last,
//             buy:each.buy,
//             sell:each.sell,
//             volume:each.volume,
//             baseUnit:each.base_unit
//     }))
//     this.setState({top_10_list:updatedData})
//     }

//     render(){
//         const {top_10_list} = this.state
//         return(
//             <div className="home-page">
//                 <div className='header'>
//                     <h1 className='main-heading'>HODLINFO</h1>
//                     <div className='header'>
//                         <select className='btn-select'>
//                             <option>INR</option>
//                         </select>
//                         <select className='btn-select'>
//                             <option>BTC</option>
//                         </select>
//                         <h1 className='btn-buy'>BUY</h1>
//                     </div>
//                     <button type="button" className='btn-style'>Connect Telegram</button>
//                 </div>
//                 <div>
//                     <div className='fetched-details-heading'>
//                         <h2>#</h2>
//                         <h2>Platform</h2>
//                         <h2>Last Traded Price</h2>
//                         <h2>Buy / Sell Price</h2>
//                         <h2>Difference</h2>
//                         <h2>Base Unit</h2>
//                     </div>
//                     {top_10_list.map((each,index)=>(
//                         <div className='fetched-details'>
//                             <h2>{index+1}</h2>
//                             <h2>{each.name}</h2>
//                             <h2>{each.last}</h2>
//                             <h2>{each.buy} / {each.sell}</h2>
//                             <h2>{each.volume} % </h2>
//                             <h2>{each.baseUnit}</h2>
//                         </div>
//                     ))}
//                 </div>
//             </div>           
//         )
//     }
// }

// export default MainPage


import React, { Component } from 'react';
import './index.css';

class MainPage extends Component {
    state = {
        top_10_list: [],
        islight:true,
    };

    changeColor=()=>{
        this.setState((prev)=>({islight:!(prev.islight)}))
    }

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        try {
            const response = await fetch('http://localhost:3005/api/data');
            const data = await response.json();
            const updatedData = data.map(each => ({
                name: each.name,
                last: each.last,
                buy: each.buy,
                sell: each.sell,
                volume: each.volume,
                baseUnit: each.base_unit
            }));
            this.setState({ top_10_list: updatedData });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    render() {
        const { top_10_list , islight} = this.state;
        const background = islight ? "#191d28" : "#ffffff"
        const text = islight ? "Light" : "Dark"
        return (
            <div className="home-page" style={{background}}>
                <div className='header'>
                    <h1 className='main-heading'>HODLINFO</h1>
                    <div className='header-options'>
                        <select className='btn-select'>
                            <option>INR</option>
                        </select>
                        <select className='btn-select'>
                            <option>BTC</option>
                        </select>
                        <button type="button" className='btn-buy'>BUY</button>
                    </div>
                    <div>
                    <button type="button" className='btn-style'>Connect Telegram</button>
                    <button type="button" className='btn-change-color' onClick={this.changeColor}>{text}</button>
                    </div>
                </div>
                <div className='trade-details'>
                    <div>
                        <h1 className='trade-color'>0.59%</h1>
                        <p className='trade-time-color'>5 Mins</p>
                    </div>
                    <div>
                        <h1 className='trade-color'>1.44%</h1>
                        <p className='trade-time-color'>1 Hour</p>
                    </div>
                    <div>
                        <h1 className='trade-price-color'>51,39,089</h1>
                        <p className='trade-avg-color'>Average BTC/INR net price including commission</p>
                    </div>
                    <div>
                        <h1 className='trade-color'>8.4%</h1>
                        <p className='trade-time-color'>1 Day</p>
                    </div>
                    <div>
                        <h1 className='trade-color'>18.02%</h1>
                        <p className='trade-time-color'>7 Days</p>
                    </div>
                </div>
                <div className="table-container">
                    <table className='data-table'>
                        <thead>
                            <tr className='fetched-details-heading'>
                                <th className='data-item'>#</th>
                                <th  className='data-item'>Platform</th>
                                <th  className='data-item'>Last Traded Price</th>
                                <th  className='data-item'> Buy Price</th>
                                <th  className='data-item'>Sell Price</th>
                                <th  className='data-item'>Difference</th>
                                <th  className='data-item'>Base Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {top_10_list.map((each, index) => (
                                <tr key={index} className='fetched-details'>
                                    <td>{index+1}</td>
                                    <td>{each.name}</td>
                                    <td>{each.last}</td>
                                    <td>{each.buy}</td>
                                    <td>{each.sell}</td>
                                    <td>{each.volume} %</td>
                                    <td>{each.baseUnit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default MainPage;
