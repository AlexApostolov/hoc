import React, { Component } from 'react';
import { connect } from 'react-redux';

// Export a function with 1 arg: component you want to wrap with your require_authentication HOC component
// conventionally reffered to as the ComposedComponent
// Authenitcation is the HOC & Resources is the component we want to wrap
// ComposedComponent = Authentication(Resources);
export default function(ComposedComponent) {
  class Authentication extends Component {
    // "context" is similar to "props", but spans the entire render tree: can skip levels/components
    // To prevent abusing "context" over "props", you need to first declare contextTypes on each React class/component
    // "static" keywork defines a class level property/object on the actual class--not instance of class,
    // which can be referenced anywhere in the app by Authentication.contextTypes

    static contextTypes = {
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    // Whenever the component is being handed a new set of props or about to be re-rendered
    // When user clicks Sign Out the resources list should be removed
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      console.log(this.context);
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }

  // The "connect" function is a HOC itself, so we're wrapping a HOC in a HOC
  return connect(mapStateToProps)(Authentication);
}
