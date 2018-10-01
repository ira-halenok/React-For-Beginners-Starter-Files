import React from "react";
import PropTypes from "prop-types"
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base'

class App extends React.Component {
    static propTypes = {
        match: PropTypes.object
    }
    state = {
        fishes: {},
        order: {},
    };

    componentDidMount() {
        const { params } = this.props.match;
        // first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    };

    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    };

    componentWillUnmount() {
        base.removeBinding(this.ref);
    };

    addFish = (fish) => {
        // take a copy of the existing state
        const fishes = { ...this.state.fishes };
        //add our new fish to that fishes variable
        fishes[`fish${(Date.now())}`] = fish;
        // set the new fishes object
        this.setState({ fishes });
    };

    updateFish = (key, updatedFish) => {
        // take the copy of the current state
        const fishes = { ...this.state.fishes };
        // update that state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({ fishes });
    };

    deleteFish = (key) => {
        // take a copy of state
        const fishes = {...this.state.fishes}
        // update the state
        fishes[key] = null;
        // update state
        this.setState ({ fishes });
    };

    loadSamplesFishes = () => {
        this.setState({ fishes: sampleFishes })
    };

    addToOrder = (key) => {
        // take a copy of state
        const order = { ...this.state.order };
        // either add to the order or update the number in the order
        order[key] = order[key] + 1 || 1
        // call setState to update our state object
        this.setState({ order })
    };

    deleteFromOrder = (key) => {
        // take a copy of state
        const order = {...this.state.order}
        // update the state: delete only one item from list if there are multiple of them
        // if (order[key] > 1) {
        //     order[key] -= 1;
        // }
        // else order[key] = 0;

        // delete the whole item from list no matter how many items it contains
        delete order[key];
        // update state
        this.setState ({ order });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" age={100} />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order 
                    fishes={this.state.fishes} 
                    order={this.state.order} 
                    deleteFromOrder={this.deleteFromOrder} 
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSamplesFishes}
                    fishes={this.state.fishes}
                    storeId={this.props.match.params.storeId}
                />
            </div>
        );
    }
}

export default App;
