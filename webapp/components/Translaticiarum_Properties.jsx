import React from 'react';

import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Dialog from 'material-ui/lib/dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

import dateFromUTCString from '../scripts/dateFromUTCString'


export default class Translaticiarum_Properties extends React.Component
{
  constructor( props )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
      Translaticiarum_Date: dateFromUTCString( props.Translaticiarum_Date ),
      Translaticiarum_Time: dateFromUTCString( props.Translaticiarum_Time ),
    };
  }

  _handle_Open( )
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  }

  _handle_onChange_Translaticiarum_Date = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Date: value
    } );
  };

  _handle_onChange_Translaticiarum_Time = ( event, value ) =>
  {
    this.setState( {
      Translaticiarum_Time: value
    } );
  };

  _handle_onTouchTap_Close = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    this.props.updateHandler( {
      Translaticiarum_Type: this.refs.Translaticiarum_Type.getValue( ),
      Translaticiarum_Date: this.state.Translaticiarum_Date.toJSON( ),
      Translaticiarum_Time: this.state.Translaticiarum_Time.toJSON( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="Translaticiarum"
          actions={ [
            <RaisedButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Close } />,
            <RaisedButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
          ] }
        >
          <TextField
            ref="Translaticiarum_Type"
            defaultValue={ this.props.Translaticiarum_Type }
            floatingLabelText="Type"
            fullWidth={ true }
          />
          <DatePicker
            hintText="Date"
            value={ this.state.Translaticiarum_Date }
            onChange={ this._handle_onChange_Translaticiarum_Date }
          />
          <TimePicker
            hintText="Time"
            value={ this.state.Translaticiarum_Time }
            onChange={ this._handle_onChange_Translaticiarum_Time }
          />
        </Dialog>
      </div>
    );
  }
}

// .toLocaleDateString( 'en-US' )
// .toLocaleTimeString( 'en-US' )