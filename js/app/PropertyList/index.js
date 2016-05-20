'use strict';

import React from 'react-native';

const {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    PixelRatio,
    TouchableOpacity
} = React;

import F from '../../common/react.force';

import forceClient from '../../common/react.force/react.force.net.js';

import SLDS from 'design-system-react-native';

import PropertyListItem from './PropertyListItem';

import styles from './styles';


const soql = 'SELECT Id, Name, Title__c, Thumbnail_IMG__c, City__c, State__c, Price__c FROM Property__c LIMIT 100';

module.exports = React.createClass({
    getInitialState() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
          dataSource: ds.cloneWithRows([]),
      };
    },
    
    componentDidMount() {
      forceClient.query(soql,
        (response) => {
          const items = response.records;
          this.setState({
              dataSource: this.getDataSource(items),
          });
        });
    },

    handlePress() {
      if(this.props.navigator){
        this.props.navigator.push({
          name:'propertyDetail',

        });
      }
    },

    getDataSource (users) {
      return this.state.dataSource.cloneWithRows(users);
    },

    renderRow (sobj) {
      return (
        <F.SobjContainer type={sobj.attributes.type} id={sobj.Id} >
          <PropertyListItem sobj={sobj} route={this.props.route} navigator={this.props.navigator} />
        </F.SobjContainer>
      );
    },

    render () {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow} />
      );
    }

});