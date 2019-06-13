import React, { Component } from "react";

export default class Profile extends Component {

    render = () => {

        return(
          <div className="row">
            <div className="col-6">
            <h6 className="float-right">{this.props.profile_type}</h6>
          </div>

          <div className="col-6">
            {this.props.genderRatioTrue === false &&
            <h6 className="float-left">{this.props.profile_value}</h6>
            }
            {this.props.genderRatioTrue === true &&
              this.props.profile_value
            }

          </div>

          </div>
        );
    }
}
