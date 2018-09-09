import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {PeriodSelector} from "./components/Metrics/PeriodSelector"
import ErrorStats from "./components/Metrics/ErrorStats"
import EventStats from "./components/Metrics/EventStats"
import {API_URL, PERIODS_AVAILABLE} from "./constants"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPeriod: PERIODS_AVAILABLE[3][0],
      data: undefined,
      isLoading: false
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({data, isLoading: false})
      })
      .catch(err => {
        console.log(err);
        this.setState({isLoading: false})
      })
  }

  handlePeriodChange = selectedPeriod => this.setState({selectedPeriod});

  render() {
    const {selectedPeriod, data} = this.state;
    return (
      <div className='main'>
        <div className="main__wrapper">
          <h2 className="main__title">Main Metrics</h2>
          <PeriodSelector
            selected={selectedPeriod}
            onChange={this.handlePeriodChange}
            choices={PERIODS_AVAILABLE}/>
          <ErrorStats selectedPeriod={selectedPeriod} data={data}/>
          <EventStats selectedPeriod={selectedPeriod} data={data ? data.data[0] : {}}/>
        </div>
      </div>
    )
  }
}

export default module.hot ? hot(module)(App) : App