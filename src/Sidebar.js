import React, { Component } from 'react';

import InspectorPanel from './InspectorPanel';
import ComponentSelector from './ComponentSelector';
import Controls from './Controls';

import GoSearch from 'react-icons/lib/go/search';
import GoPackage from 'react-icons/lib/go/package';
import GoQuestion from 'react-icons/lib/go/question';

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      tab: 'inspector'
    };
  }

  render() {
    const renderTab = (function(name, icon) {
      return (
        <div className={this.state.tab === name ? 'selected tab' : 'tab'}
            onClick={() => {
              this.setState({tab: name});
            }}>
          {icon}
        </div>
      );
    }).bind(this);

    const tab = this.state.tab;

    return (
      <section className="sidebar">
        <div className="tabbar">
          {renderTab('inspector', <GoSearch />)}
          {renderTab('components', <GoPackage />)}
          {renderTab('about', <GoQuestion />)}
        </div>
        <div className="main">
          {
            tab === 'inspector' ? <InspectorPanel app={this.props.app} /> :
            tab === 'components' ? <ComponentSelector app={this.props.app} /> :
            tab === 'about' ? <span>About</span> : <span>Unknown tab!</span>
          }
        </div>
        <Controls app={this.props.app} />
      </section>
    );
  }
}
