import React from 'react';
import Relay from 'react-relay';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import NavigationMoreVert from 'material-ui/lib/svg-icons/navigation/more-vert';


import ActionAccountBalance from 'material-ui/lib/svg-icons/action/account-balance'; // Speak in senate
import ActionAccessibility from 'material-ui/lib/svg-icons/action/accessibility'; // Exercise
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all'; // Get things done
import ActionTrendingUp from 'material-ui/lib/svg-icons/action/trending-up'; // Play the stock market
import ContentCreate from 'material-ui/lib/svg-icons/content/create'; // Write poems
import HardwareHeadset from 'material-ui/lib/svg-icons/hardware/headset'; // Listen to music
import ImageLandscape from 'material-ui/lib/svg-icons/image/landscape'; // Hike

import dateFromUTCString from '../scripts/dateFromUTCString'

import Ensayo_deleteMutation from '../mutations/Ensayo_deleteMutation';
import Ensayo_updateMutation from '../mutations/Ensayo_updateMutation';

import Ensayo_Properties from './Ensayo_Properties.jsx';


class Ensayo_Item extends React.Component
{
  _handle_updateHandler_Ensayo = ( Ensayo_properties ) =>
  {
    Relay.Store.commitUpdate(
      new Ensayo_updateMutation( { Ensayo: this.props.Ensayo, ...Ensayo_properties } )
    );
  };

  _Ensayo_delete( )
  {
    Relay.Store.commitUpdate(
      new Ensayo_deleteMutation( { Ensayo: this.props.Ensayo, Viewer: this.props.Viewer } )
    );
  }

  _handle_onItemTouchTap = ( e, item ) =>
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        this.refs.Ensayo_Properties._handle_Open( );
        break;
      case 'delete':
        console.log( 'delete' );
        this._Ensayo_delete( );
        break;
      default:
        break;
    }
  };

  render( )
  {
    const theDate = dateFromUTCString( this.props.Ensayo.Ensayo_Title );
    const theTime = dateFromUTCString( this.props.Ensayo.Ensayo_Keywords );
    const theDateTime = new Date( theDate.getTime( ) + theTime.getTime( ) );

    const rightIconMenu = (
      <IconMenu
        iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
        onItemTouchTap={ this._handle_onItemTouchTap }
      >
        <MenuItem ref="edit" index={0}>Edit</MenuItem>
        <MenuItem ref="delete" index={1}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <ListItem
          primaryText={ this.props.Ensayo.Ensayo_Title }
          rightIconButton={ rightIconMenu }
        />
        <Ensayo_Properties
          ref="Ensayo_Properties"
          Ensayo_Content={ this.props.Ensayo.Ensayo_Content }
          Ensayo_Title={ this.props.Ensayo.Ensayo_Title }
          Ensayo_Keywords={ this.props.Ensayo.Ensayo_Keywords }
          updateHandler={ this._handle_updateHandler_Ensayo }
        />
      </div>
    );
  }
}

export default Relay.createContainer( Ensayo_Item, {
  fragments: {
    Ensayo: () => Relay.QL`
      fragment on Ensayo {
        id,
        Ensayo_Title,
        Ensayo_Keywords,
        Ensayo_Content,
        ${Ensayo_deleteMutation.getFragment('Ensayo')},
        ${Ensayo_updateMutation.getFragment('Ensayo')},
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Ensayo_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
} );