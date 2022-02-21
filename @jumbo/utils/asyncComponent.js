import React, { Component } from 'react';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { CircularProgress } from '@material-ui/core';

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component: null,
      };
    }

    componentWillMount() {
      Nprogress.start();
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    async componentDidMount() {
      this.mounted = true;
      const { default: Component } = await importComponent();
      Nprogress.done();
      if (this.mounted) {
        this.setState({
          component: <Component {...this.props} />,
        });
      }
    }

    render() {
      const Component = this.state.component || (
        <div className="loader-view" style={{ height: 'calc(100vh - 200px)' }}>
          <CircularProgress />
        </div>
      );
      return Component;
    }
  }

  return AsyncFunc;
}
