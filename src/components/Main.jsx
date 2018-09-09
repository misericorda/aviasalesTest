import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {PeriodSelector} from "./Metrics/PeriodSelector"
import ErrorStats from "./Metrics/ErrorStats"
import EventStats from "./Metrics/EventStats"
import {PERIODS_AVAILABLE} from "../constants"
import {startGetMetricsData} from "../store/actions/metrics"
import {LoadingSpinner} from "./ui/Icons"

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPeriod: PERIODS_AVAILABLE[3][0],
      data: undefined,
      isLoading: false
    }
  }

  componentDidMount() {
    this.props.startGetMetricsData();
  }

  handlePeriodChange = selectedPeriod => this.setState({selectedPeriod});
  render() {
    const {selectedPeriod} = this.state;
    const {data, isLoading} = this.props;
    let periodData;
    if (data) {
      periodData = data[selectedPeriod]
    }
    return (
      <div className="main">
        <div className="main__wrapper">
          <h2 className="main__title">Main Metrics</h2>
          <PeriodSelector
            selected={selectedPeriod}
            onChange={this.handlePeriodChange}
            choices={PERIODS_AVAILABLE}/>
          <div className="main__content position-relative">
            {isLoading && <div className="loading_screen"><LoadingSpinner/></div> }
            <ErrorStats data={periodData}/>
            <EventStats selectedPeriod={selectedPeriod} data={periodData}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.metrics.isLoading,
    data: state.metrics.data,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    startGetMetricsData,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);