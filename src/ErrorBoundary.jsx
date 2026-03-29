// src/ErrorBoundary.jsx
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    this.setState({ info });
    // also log to console
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding:24, fontFamily: "system-ui, Arial, sans-serif",
          color:"#111", background:"#ffefef", minHeight:"100vh"
        }}>
          <h2 style={{color:"#b00020"}}>Something crashed</h2>
          <pre style={{whiteSpace:"pre-wrap", color:"#333"}}>
            {String(this.state.error && this.state.error.toString())}
          </pre>
          <details style={{whiteSpace:"pre-wrap", color:"#333"}}>
            {this.state.info && this.state.info.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
