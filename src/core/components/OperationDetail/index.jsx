/**
 * Code extracts from Operations
 */

import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])


export default class OperationDetail extends React.Component {
  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
  };

  render() {
    let {
      specSelectors,
      getComponent,
      layoutSelectors,
    } = this.props

    const currentOperation = layoutSelectors.currentOperation()
    if (!currentOperation) return null
    const { op, tag } = currentOperation
    if (!op) return null

    const OperationContainer = getComponent("OperationContainer", true)

    const path = op.get("path")
    const method = op.get("method")
    const specPath = Im.List(["paths", path, method])

    const validMethods = specSelectors.isOAS3() ?
          OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

    if(validMethods.indexOf(method) === -1) {
      return null
    }

    return (
      <div className="operation-detail">
        <OperationContainer
          key={`${path}-${method}`}
          specPath={specPath}
          op={op}
          path={path}
          method={method}
          tag={tag}
        />
      </div>
    )
  }
}
