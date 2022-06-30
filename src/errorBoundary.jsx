import React, { Component } from "react";
import Button from "./components/button";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-7 text-red-400 h-screen flex flex-col items-center justify-center">
          <h3>Oops! Something went wrong</h3>
          <Button onClick={() => window.location.reload()} className="bg-blue-500" text="Reload" />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
