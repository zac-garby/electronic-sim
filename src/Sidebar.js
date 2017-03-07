import React, { Component } from 'react';

import InspectorPanel from './InspectorPanel';
import ComponentSelector from './ComponentSelector';
import Controls from './Controls';
import SavePanel from './SavePanel';
import AboutPanel from './AboutPanel';

import GoSearch from 'react-icons/lib/go/search';
import GoPackage from 'react-icons/lib/go/package';
import GoQuestion from 'react-icons/lib/go/question';
import GoFileText from 'react-icons/lib/go/file-text';

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      tab: 'about'
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
          {renderTab('save', <GoFileText />)}
        </div>
        <div className="main">
          {
            tab === 'inspector' ? <InspectorPanel app={this.props.app} /> :
            tab === 'components' ? <ComponentSelector app={this.props.app} /> :
            tab === 'about' ? <AboutPanel /> :
            tab === 'save' ? <SavePanel app={this.props.app} /> : <span>Unknown tab!</span>
          }
        </div>
        <Controls app={this.props.app} />
      </section>
    );
  }
}
